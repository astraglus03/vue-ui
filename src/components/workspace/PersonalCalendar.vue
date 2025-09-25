<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  currentChannel: String
})

// 현재 날짜
const currentDate = ref(new Date())

// 현재 뷰 (boards, timeline, calendar)
const currentView = ref('boards')

// 타임라인 뷰 모드 (month, week)
const timelineViewMode = ref('month')

// 보드 관리 (제한 없음)
const boards = ref([
  { id: 1, name: '해야할 일', color: '#e3f2fd', order: 1 },
  { id: 2, name: '진행중', color: '#fff3e0', order: 2 },
  { id: 3, name: '완료', color: '#e8f5e8', order: 3 }
])

// 드래그 앤 드롭 상태
const draggedBoard = ref(null)
const draggedOverBoard = ref(null)

// 업무 목록 (2025년 7월~11월 데이터)
const tasks = ref([
  // 7월 데이터
  {
    id: 1,
    title: '여름휴가 계획',
    description: '제주도 여름휴가 일정 및 숙소 예약',
    boardId: 1,
    assignee: '김민수',
    startDate: '2025-07-01',
    endDate: '2025-07-15',
    createdAt: '2025-06-25',
    priority: 'high'
  },
  {
    id: 2,
    title: '헬스장 등록',
    description: '새해 다이어트를 위한 헬스장 등록 및 PT 상담',
    boardId: 2,
    assignee: '김민수',
    startDate: '2025-07-05',
    endDate: '2025-07-20',
    createdAt: '2025-07-01',
    priority: 'medium'
  },
  {
    id: 3,
    title: '독서 목표 달성',
    description: '올해 목표로 정한 책 10권 읽기 마무리',
    boardId: 3,
    assignee: '김민수',
    startDate: '2025-07-10',
    endDate: '2025-07-25',
    createdAt: '2025-07-05',
    priority: 'high'
  },
  {
    id: 4,
    title: '친구들과 여행',
    description: '대학교 동기들과 부산 여행 계획',
    boardId: 1,
    assignee: '김민수',
    startDate: '2025-07-15',
    endDate: '2025-08-05',
    createdAt: '2025-07-10',
    priority: 'high'
  },
  {
    id: 5,
    title: '새 취미 시작',
    description: '기타 배우기 시작 및 레슨 등록',
    boardId: 2,
    assignee: '김민수',
    startDate: '2025-07-20',
    endDate: '2025-08-10',
    createdAt: '2025-07-15',
    priority: 'medium'
  },
  {
    id: 6,
    title: '영화관람',
    description: '새로 개봉한 영화들 관람',
    boardId: 1,
    assignee: '김민수',
    startDate: '2025-07-25',
    endDate: '2025-08-15',
    createdAt: '2025-07-20',
    priority: 'medium'
  },
  // 8월 데이터
  {
    id: 7,
    title: '언어 공부 시작',
    description: '일본어 공부 시작 및 교재 구매',
    boardId: 2,
    assignee: '김민수',
    startDate: '2025-08-01',
    endDate: '2025-08-20',
    createdAt: '2025-07-25',
    priority: 'high'
  },
  {
    id: 8,
    title: '요리 배우기',
    description: '집에서 요리 클래스 수강 및 실습',
    boardId: 3,
    assignee: '김민수',
    startDate: '2025-08-05',
    endDate: '2025-08-25',
    createdAt: '2025-08-01',
    priority: 'high'
  },
  {
    id: 9,
    title: '친구 생일파티',
    description: '친구 생일파티 준비 및 참석',
    boardId: 2,
    assignee: '김민수',
    startDate: '2025-08-10',
    endDate: '2025-08-30',
    createdAt: '2025-08-05',
    priority: 'medium'
  },
  {
    id: 10,
    title: '가족 여행',
    description: '가족과 함께하는 제주도 여행',
    boardId: 1,
    assignee: '김민수',
    startDate: '2025-08-15',
    endDate: '2025-09-05',
    createdAt: '2025-08-10',
    priority: 'high'
  },
  {
    id: 11,
    title: '운동 루틴 정리',
    description: '헬스장에서 새로운 운동 루틴 만들기',
    boardId: 3,
    assignee: '김민수',
    startDate: '2025-08-20',
    endDate: '2025-09-10',
    createdAt: '2025-08-15',
    priority: 'low'
  },
  {
    id: 12,
    title: '새해 계획 세우기',
    description: '2026년 개인 목표 및 계획 수립',
    boardId: 2,
    assignee: '김민수',
    startDate: '2025-08-25',
    endDate: '2025-09-15',
    createdAt: '2025-08-20',
    priority: 'high'
  },
  // 9월 데이터
  {
    id: 13,
    title: '친구들과 송년회',
    description: '대학교 동기들과 송년회 모임',
    boardId: 1,
    assignee: '김민수',
    startDate: '2025-09-01',
    endDate: '2025-09-20',
    createdAt: '2025-08-25',
    priority: 'medium'
  },
  {
    id: 14,
    title: '크리스마스 선물 준비',
    description: '가족과 친구들에게 줄 크리스마스 선물 쇼핑',
    boardId: 3,
    assignee: '김민수',
    startDate: '2025-09-05',
    endDate: '2025-09-25',
    createdAt: '2025-09-01',
    priority: 'medium'
  },
  {
    id: 15,
    title: '연말 여행 계획',
    description: '제주도 연말 여행 일정 및 숙소 예약',
    boardId: 2,
    assignee: '김민수',
    startDate: '2025-09-10',
    endDate: '2025-09-30',
    createdAt: '2025-09-05',
    priority: 'high'
  },
  // 10월 데이터
  {
    id: 16,
    title: '독서 목표 달성',
    description: '올해 목표로 정한 책 10권 읽기 마무리',
    boardId: 1,
    assignee: '김민수',
    startDate: '2025-10-01',
    endDate: '2025-10-15',
    createdAt: '2025-09-25',
    priority: 'high'
  },
  {
    id: 17,
    title: '새 취미 시작',
    description: '기타 배우기 시작 및 레슨 등록',
    boardId: 3,
    assignee: '김민수',
    startDate: '2025-10-05',
    endDate: '2025-10-20',
    createdAt: '2025-10-01',
    priority: 'medium'
  },
  {
    id: 18,
    title: '최종 배포',
    description: '프로덕션 환경에 최종 배포',
    boardId: 2,
    assignee: '김민수',
    startDate: '2025-10-10',
    endDate: '2025-10-25',
    createdAt: '2025-10-05',
    priority: 'high'
  },
  // 11월 데이터
  {
    id: 19,
    title: '사후 모니터링',
    description: '배포 후 시스템 안정성 모니터링',
    boardId: 1,
    assignee: '김민수',
    startDate: '2025-11-01',
    endDate: '2025-11-15',
    createdAt: '2025-10-25',
    priority: 'medium'
  },
  {
    id: 20,
    title: '프로젝트 회고',
    description: '프로젝트 완료 후 회고 및 개선점 도출',
    boardId: 3,
    assignee: '김민수',
    startDate: '2025-11-05',
    endDate: '2025-11-20',
    createdAt: '2025-11-01',
    priority: 'low'
  }
])

// 모달 상태
const showAddTaskModal = ref(false)
const showBoardModal = ref(false)
const showTaskDetailModal = ref(false)
const selectedTask = ref(null)
const showDayEventsModal = ref(false)
const selectedDay = ref(null)
const selectedDayEvents = ref([])

// 검색 및 필터
const searchQuery = ref('')
const selectedBoardFilter = ref('all')

// 다중 필터 상태
const selectedBoardFilters = ref([])
const showMultiFilter = ref(false)
const filterDropdownStyle = ref({})

// 고유한 담당자와 우선순위 목록 제거

// 필터 관련 함수들
const clearAllFilters = () => {
  selectedBoardFilters.value = []
  selectedBoardFilter.value = 'all'
}

// applyFilters 함수 제거 - 실시간 필터링으로 대체

// 활성 필터가 있는지 확인
const hasActiveFilters = computed(() => {
  return selectedBoardFilters.value.length > 0
})

// 개별 필터 제거 함수
const removeBoardFilter = (boardId) => {
  const index = selectedBoardFilters.value.indexOf(boardId)
  if (index > -1) {
    selectedBoardFilters.value.splice(index, 1)
  }
}

// 새 업무 데이터
const newTask = ref({
  title: '',
  description: '',
  boardId: 1,
  startDate: '',
  endDate: ''
})

// 담당자 이름 (개인 일정이므로 자동 할당)
const assigneeName = ref('김민수')

// 보드별 업무 추가 함수
const addTaskToBoard = (boardId) => {
  newTask.value.boardId = boardId
  showAddTaskModal.value = true
}

// 보드 이름 가져오기
const getBoardName = (boardId) => {
  const board = boards.value.find(b => b.id === boardId)
  return board ? board.name : ''
}

// 보드 색상 가져오기
const getBoardColor = (boardId) => {
  const board = boards.value.find(b => b.id === boardId)
  return board ? board.color : '#e3f2fd'
}

// 보드 필터 토글
const toggleBoardFilter = (boardId) => {
  const index = selectedBoardFilters.value.indexOf(boardId)
  if (index > -1) {
    selectedBoardFilters.value.splice(index, 1)
  } else {
    selectedBoardFilters.value.push(boardId)
  }
}

// 일정 수정 함수
const editTask = (task) => {
  // 일정 수정 로직 (현재는 상세 모달을 닫고 추가 모달을 열도록 함)
  showTaskDetailModal.value = false
  showAddTaskModal.value = true
  // 기존 일정 데이터를 폼에 채우기
  newTask.value = {
    title: task.title,
    description: task.description,
    boardId: task.boardId,
    assignee: task.assignee,
    startDate: task.startDate,
    endDate: task.endDate
  }
}

// 필터 드롭다운 위치 계산
const calculateFilterPosition = () => {
  const filterBtn = document.querySelector('.multi-filter-btn')
  if (filterBtn) {
    const rect = filterBtn.getBoundingClientRect()
    filterDropdownStyle.value = {
      position: 'fixed',
      top: `${rect.bottom + 8}px`,
      right: `${window.innerWidth - rect.right}px`,
      zIndex: 9999
    }
  }
}

// 필터 표시/숨김 토글
const toggleMultiFilter = () => {
  if (!showMultiFilter.value) {
    calculateFilterPosition()
  }
  showMultiFilter.value = !showMultiFilter.value
}

// 새 보드 데이터
const newBoard = ref({
  name: '',
  color: '#e3f2fd'
})

// 보드 색상 옵션
const boardColors = [
  '#e3f2fd', '#fff3e0', '#e8f5e8', '#fce4ec', '#f3e5f5',
  '#e0f2f1', '#fff8e1', '#ffebee', '#e8eaf6', '#f1f8e9'
]

// 필터링된 업무 목록
const filteredTasks = computed(() => {
  let filtered = tasks.value

  // 검색어 필터
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(task => 
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // 다중 필터가 활성화된 경우 (보드만, OR 모드)
  if (hasActiveFilters.value) {
    filtered = filtered.filter(task => {
      return selectedBoardFilters.value.includes(task.boardId)
    })
  } else {
    // 다중 필터가 비활성화된 경우에만 단일 보드 필터 적용
    if (selectedBoardFilter.value !== 'all') {
      filtered = filtered.filter(task => task.boardId === parseInt(selectedBoardFilter.value))
    }
  }

  return filtered
})

// 타임라인 날짜 범위 계산
const timelineDateRange = computed(() => {
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1) // 3개월 전
  const endDate = new Date(now.getFullYear(), now.getMonth() + 4, 0) // 5개월 후
  
  return { startDate, endDate }
})

// 타임라인 표시용 날짜들
const timelineDates = computed(() => {
  if (timelineViewMode.value === 'month') {
    const { startDate, endDate } = timelineDateRange.value
    const dates = []
    let current = new Date(startDate)
    
    while (current <= endDate) {
      dates.push({
        date: new Date(current),
        type: 'month',
        label: current.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
      })
      current.setMonth(current.getMonth() + 1)
    }
    
    return dates
  } else {
    // 주별 뷰
    const { startDate, endDate } = timelineDateRange.value
    const dates = []
    let current = new Date(startDate)
    current.setDate(current.getDate() - current.getDay()) // 주의 시작
    
    while (current <= endDate) {
      const month = current.getMonth() + 1
      const weekNumber = Math.ceil((current.getDate()) / 7)
      
      dates.push({
        date: new Date(current),
        type: 'week',
        label: `${month}월 ${weekNumber}주`
      })
      current.setDate(current.getDate() + 7)
    }
    
    return dates
  }
})

// 업무가 특정 날짜 범위에 포함되는지 확인
const isTaskInDateRange = (task, date) => {
  const taskStart = new Date(task.startDate)
  const taskEnd = new Date(task.endDate)
  const checkDate = new Date(date)
  
  // 월별 뷰인 경우
  if (timelineViewMode.value === 'month') {
    const taskStartMonth = taskStart.getFullYear() * 12 + taskStart.getMonth()
    const taskEndMonth = taskEnd.getFullYear() * 12 + taskEnd.getMonth()
    const checkMonth = checkDate.getFullYear() * 12 + checkDate.getMonth()
    
    return checkMonth >= taskStartMonth && checkMonth <= taskEndMonth
  } else {
    // 주별 뷰인 경우
    const taskStartWeek = getWeekNumber(taskStart)
    const taskEndWeek = getWeekNumber(taskEnd)
    const checkWeek = getWeekNumber(checkDate)
    
    return checkWeek >= taskStartWeek && checkWeek <= taskEndWeek
  }
}

// 주 번호 계산
const getWeekNumber = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

// 보드별 업무 목록
const getTasksByBoard = (boardId) => {
  return filteredTasks.value.filter(task => task.boardId === boardId)
}

// 업무 추가
const addTask = () => {
  if (!newTask.value.title.trim()) return

  const task = {
    id: Date.now(),
    title: newTask.value.title,
    description: newTask.value.description,
    boardId: newTask.value.boardId,
    assignee: '김민수', // 개인이므로 자기 자신 고정
    startDate: newTask.value.startDate,
    endDate: newTask.value.endDate,
    createdAt: new Date().toISOString().split('T')[0],
    priority: 'medium'
  }

  tasks.value.push(task)
  newTask.value = {
    title: '',
    description: '',
    boardId: 1,
    startDate: '',
    endDate: ''
  }
  showAddTaskModal.value = false
}

// 보드 추가
const addBoard = () => {
  if (!newBoard.value.name.trim()) return

  const board = {
    id: Date.now(),
    name: newBoard.value.name,
    color: newBoard.value.color,
    order: boards.value.length + 1
  }

  boards.value.push(board)
  newBoard.value = {
    name: '',
    color: '#e3f2fd'
  }
  showBoardModal.value = false
}

// 보드 삭제
const deleteBoard = (boardId) => {
  // 해당 보드의 업무들을 첫 번째 보드로 이동 (보드가 있는 경우)
  if (boards.value.length > 1) {
    const firstBoard = boards.value.find(b => b.id !== boardId)
    if (firstBoard) {
      tasks.value.forEach(task => {
        if (task.boardId === boardId) {
          task.boardId = firstBoard.id
        }
      })
    }
  } else {
    // 마지막 보드인 경우 업무들을 삭제
    tasks.value = tasks.value.filter(task => task.boardId !== boardId)
  }

  boards.value = boards.value.filter(board => board.id !== boardId)
}

// 업무 상세 보기
const viewTaskDetail = (task) => {
  selectedTask.value = task
  showTaskDetailModal.value = true
}

// 업무 보드 이동
const moveTask = (taskId, newBoardId) => {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) {
    task.boardId = newBoardId
  }
}

// 보드 이름 수정
const editBoardName = (boardId, newName) => {
  const board = boards.value.find(b => b.id === boardId)
  if (board) {
    board.name = newName
  }
}

// 드래그 시작
const handleDragStart = (event, board) => {
  draggedBoard.value = board
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/html', event.target.outerHTML)
  event.target.style.opacity = '0.5'
}

// 드래그 종료
const handleDragEnd = (event) => {
  event.target.style.opacity = '1'
  draggedBoard.value = null
  draggedOverBoard.value = null
}

// 드래그 오버
const handleDragOver = (event, board) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
  draggedOverBoard.value = board
}

// 드래그 리브
const handleDragLeave = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    draggedOverBoard.value = null
  }
}

// 드롭
const handleDrop = (event, targetBoard) => {
  event.preventDefault()
  
  if (!draggedBoard.value || draggedBoard.value.id === targetBoard.id) {
    return
  }

  // 보드 순서 재정렬
  const draggedIndex = boards.value.findIndex(b => b.id === draggedBoard.value.id)
  const targetIndex = boards.value.findIndex(b => b.id === targetBoard.id)
  
  if (draggedIndex !== -1 && targetIndex !== -1) {
    // 보드 이동
    const [draggedItem] = boards.value.splice(draggedIndex, 1)
    boards.value.splice(targetIndex, 0, draggedItem)
    
    // order 값 업데이트
    boards.value.forEach((board, index) => {
      board.order = index + 1
    })
  }
  
  draggedOverBoard.value = null
}

// 날짜 포맷팅
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 캘린더 관련 함수들
const getCalendarDays = () => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const current = new Date(startDate)
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  
  return days
}

// 특정 날짜의 업무 목록
const getTasksForDate = (date) => {
  const dateStr = date.toISOString().split('T')[0]
  return tasks.value.filter(task => 
    task.startDate <= dateStr && task.endDate >= dateStr
  )
}

// 특정 날짜의 업무 목록 (제한된 개수)
const getTasksForDateLimited = (date, limit = 2) => {
  const allTasks = getTasksForDate(date)
  return {
    tasks: allTasks.slice(0, limit),
    hasMore: allTasks.length > limit,
    moreCount: Math.max(0, allTasks.length - limit)
  }
}

// 연속되는 일정인지 확인
const isContinuousTask = (task, date) => {
  const dateStr = date.toISOString().split('T')[0]
  const startDate = new Date(task.startDate)
  const endDate = new Date(task.endDate)
  const currentDate = new Date(dateStr)
  
  return currentDate > startDate && currentDate < endDate
}

// 일정 제목 자르기
const truncateTitle = (title, maxLength = 15) => {
  if (title.length <= maxLength) return title
  return title.substring(0, maxLength) + '...'
}

// 날짜별 이벤트 모달 열기
const openDayEventsModal = (date) => {
  selectedDay.value = date
  selectedDayEvents.value = getTasksForDate(date)
  showDayEventsModal.value = true
}

// 날짜별 이벤트 모달 닫기
const closeDayEventsModal = () => {
  showDayEventsModal.value = false
  selectedDay.value = null
  selectedDayEvents.value = []
}

// 월 변경
const changeMonth = (direction) => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + direction)
  currentDate.value = newDate
}

// 오늘로 이동
const goToToday = () => {
  currentDate.value = new Date()
}

// 타임라인 바 스타일 계산
const getTimelineBarStyle = (task) => {
  const startDate = new Date(task.startDate)
  const endDate = new Date(task.endDate)
  
  // 2025년 7월 기준으로 계산
  const baseDate = new Date('2025-07-01')
  const startOffset = Math.max(0, (startDate - baseDate) / (1000 * 60 * 60 * 24))
  const duration = Math.max(1, (endDate - startDate) / (1000 * 60 * 60 * 24))
  
  return {
    left: `${startOffset * 3}px`,
    width: `${Math.max(duration * 3, 20)}px`,
    backgroundColor: boards.value.find(b => b.id === task.boardId)?.color || '#e3f2fd'
  }
}

onMounted(() => {
  // 초기 데이터 설정
  const today = new Date().toISOString().split('T')[0]
  newTask.value.startDate = today
  newTask.value.endDate = today
})
</script>

<template>
  <div class="personal-calendar" :class="{ 'dark-mode': $vuetify.theme.global.current.dark }">
    <!-- 헤더 -->
    <div class="calendar-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">개인 일정 관리 <span class="page-subtitle">개인 일정을 체계적으로 관리하세요</span></h1>
        </div>
        <div class="header-right">
          <!-- 뷰 전환 아이콘들 -->
          <div class="view-icons">
            <button
              class="view-icon-btn"
              :class="{ 'active': currentView === 'boards' }"
              @click="currentView = 'boards'"
              title="보드"
            >
              <v-icon size="20">mdi-view-column</v-icon>
            </button>
            <button
              class="view-icon-btn"
              :class="{ 'active': currentView === 'calendar' }"
              @click="currentView = 'calendar'"
              title="캘린더"
            >
              <v-icon size="20">mdi-calendar</v-icon>
            </button>
          </div>
          
          <v-btn
            color="primary"
            size="large"
            class="add-task-btn"
            @click="showAddTaskModal = true"
          >
            <v-icon left>mdi-plus</v-icon>
            일정 추가
          </v-btn>
        </div>
      </div>
    </div>


    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <!-- 보드 뷰 -->
      <div v-if="currentView === 'boards'" class="boards-view">
        <!-- 검색 및 필터 -->
        <div class="search-filter-section">
          <div class="search-container">
            <div class="search-input-wrapper">
              <v-icon class="search-icon">mdi-magnify</v-icon>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="일정 검색..." 
                class="search-input"
              />
            </div>
          </div>
          <v-btn
            color="primary"
            variant="outlined"
            size="small"
            @click="showBoardModal = true"
          >
            <v-icon left>mdi-plus</v-icon>
            보드 추가
          </v-btn>
        </div>

        <!-- 보드 목록 -->
        <div class="boards-container">
          <div
            v-for="board in boards"
            :key="board.id"
            class="board-column"
            :class="{ 
              'dragging-over': draggedOverBoard && draggedOverBoard.id === board.id,
              'dragging': draggedBoard && draggedBoard.id === board.id
            }"
            :style="{ '--board-color': board.color }"
            @dragover="handleDragOver($event, board)"
            @dragleave="handleDragLeave($event)"
            @drop="handleDrop($event, board)"
          >
            <div class="board-header">
              <div class="board-title" @mousedown.stop>
                <div 
                  class="drag-handle" 
                  @mousedown.stop
                  draggable="true"
                  @dragstart="handleDragStart($event, board)"
                  @dragend="handleDragEnd($event)"
                >
                  <v-icon size="16">mdi-drag</v-icon>
                </div>
                <input
                  :value="board.name"
                  @blur="editBoardName(board.id, $event.target.value)"
                  @mousedown.stop
                  class="board-name-input"
                />
              </div>
              <div class="board-right-section" @mousedown.stop>
                <span class="task-count">{{ getTasksByBoard(board.id).length }}</span>
                <div class="board-actions" @mousedown.stop>
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    color="error"
                    @click="deleteBoard(board.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
            
            <div class="board-content" @mousedown.stop>
              <div
                v-for="task in getTasksByBoard(board.id)"
                :key="task.id"
                class="task-card"
                @click="viewTaskDetail(task)"
              >
                <div class="task-title">{{ task.title }}</div>
                <div class="task-dates">
                  <span class="start-date">{{ formatDate(task.startDate) }}</span>
                  <span v-if="task.startDate !== task.endDate" class="end-date">
                    - {{ formatDate(task.endDate) }}
                  </span>
                </div>
                <div class="task-description">{{ task.description }}</div>
              </div>
              
              <!-- 보드별 만들기 버튼 -->
              <button 
                class="add-task-to-board-btn"
                @click="addTaskToBoard(board.id)"
                @mousedown.stop
              >
                <v-icon size="16">mdi-plus</v-icon>
                만들기
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 캘린더 뷰 -->
      <div v-if="currentView === 'calendar'" class="calendar-view">
        <div class="calendar-header-controls">
          <div class="calendar-nav">
            <button class="nav-button prev-button" @click="changeMonth(-1)">
              <v-icon>mdi-arrow-left</v-icon>
            </button>
            <div class="calendar-title">
              <h3>{{ currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' }) }}</h3>
            </div>
            <button class="nav-button next-button" @click="changeMonth(1)">
              <v-icon>mdi-arrow-right</v-icon>
            </button>
          </div>
          <button class="today-button" @click="goToToday">
            <v-icon>mdi-calendar-today</v-icon>
            오늘
          </button>
        </div>
        
        <div class="calendar-grid">
          <div class="calendar-weekdays">
            <div v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day" class="weekday">
              {{ day }}
            </div>
          </div>
          <div class="calendar-days">
            <div
              v-for="day in getCalendarDays()"
              :key="day.toISOString()"
              class="calendar-day"
              :class="{ 
                'other-month': day.getMonth() !== currentDate.getMonth(),
                'today': day.toDateString() === new Date().toDateString()
              }"
            >
              <div class="day-number">{{ day.getDate() }}</div>
              <div class="day-tasks">
                <template v-for="(task, index) in getTasksForDateLimited(day).tasks" :key="task.id">
                  <div
                    class="day-task"
                    :class="{ 
                      'continuous-task': isContinuousTask(task, day),
                      'continuous-start': task.startDate === day.toISOString().split('T')[0],
                      'continuous-end': task.endDate === day.toISOString().split('T')[0]
                    }"
                    :style="{ backgroundColor: boards.find(b => b.id === task.boardId)?.color }"
                    @click="viewTaskDetail(task)"
                  >
                    {{ truncateTitle(task.title) }}
                  </div>
                </template>
                <div
                  v-if="getTasksForDateLimited(day).hasMore"
                  class="more-tasks-btn"
                  @click="openDayEventsModal(day)"
                >
                  {{ getTasksForDateLimited(day).moreCount }}개 더보기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 일정 추가 모달 (지라 스타일) -->
    <v-dialog v-model="showAddTaskModal" max-width="800px" @click:outside="showAddTaskModal = false">
      <v-card class="jira-modal">
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <div class="header-content">
            <div class="modal-icon">
              <v-icon color="primary">mdi-calendar-plus</v-icon>
            </div>
            <div class="header-text">
              <h2 class="modal-title">새 일정 추가</h2>
              <p class="modal-subtitle">개인 일정을 생성하세요</p>
            </div>
          </div>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="showAddTaskModal = false"
            class="close-btn"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <!-- 모달 컨텐츠 -->
        <div class="modal-body">
          <v-form @submit.prevent="addTask" class="task-form">
            <!-- 제목 섹션 -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">기본 정보</h3>
              </div>
              <div class="form-content">
                <div class="input-group">
                  <label class="input-label">제목 *</label>
            <v-text-field
              v-model="newTask.title"
              variant="outlined"
              required
                    placeholder="일정 제목을 입력하세요"
                    class="modern-input title-field"
                    :rules="[v => !!v || '제목은 필수입니다']"
                    hide-details="auto"
            />
                </div>
            
                <div class="input-group">
                  <label class="input-label">내용</label>
            <v-textarea
              v-model="newTask.description"
              variant="outlined"
                    rows="4"
                    placeholder="일정에 대한 상세 내용을 입력하세요"
                    class="modern-textarea description-field"
                    hide-details
                  />
                </div>
              </div>
            </div>

            <!-- 보드 및 담당자 섹션 -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">분류 및 담당</h3>
              </div>
              <div class="form-content">
                <div class="form-row">
                  <div class="input-group">
                    <label class="input-label">보드 선택 *</label>
            <v-select
              v-model="newTask.boardId"
              :items="boards.map(b => ({ value: b.id, text: b.name }))"
              variant="outlined"
                      placeholder="보드를 선택하세요"
                      class="modern-select board-select"
                      hide-details
                    />
                  </div>
                  <div class="input-group">
                    <label class="input-label">담당자</label>
                    <div class="assignee-display">
                      <v-avatar size="32" color="primary" class="assignee-avatar">
                        <span class="text-white text-caption">{{ assigneeName.charAt(0) }}</span>
                      </v-avatar>
                      <span class="assignee-name">{{ assigneeName }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 일정 섹션 -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">일정</h3>
              </div>
              <div class="form-content">
                <div class="form-row">
                  <div class="input-group">
                    <label class="input-label">시작일</label>
              <v-text-field
                v-model="newTask.startDate"
                type="date"
                variant="outlined"
                      class="modern-input date-field"
                      hide-details
              />
                  </div>
                  <div class="input-group">
                    <label class="input-label">종료일</label>
              <v-text-field
                v-model="newTask.endDate"
                type="date"
                variant="outlined"
                      class="modern-input date-field"
                      hide-details
              />
            </div>
                </div>
              </div>
            </div>
          </v-form>
        </div>

        <!-- 모달 푸터 -->
        <div class="modal-footer">
          <div class="footer-left">
            <v-chip
              v-if="newTask.boardId"
              :color="getBoardColor(newTask.boardId)"
              size="small"
              class="board-chip"
            >
              <v-icon start>mdi-folder</v-icon>
              {{ getBoardName(newTask.boardId) }}
            </v-chip>
          </div>
          <div class="footer-actions">
            <v-btn
              variant="outlined"
              @click="showAddTaskModal = false"
              class="cancel-btn"
            >
              <v-icon left>mdi-close</v-icon>
              취소
            </v-btn>
            <v-btn
              color="primary"
              @click="addTask"
              class="create-btn"
              :disabled="!newTask.title || !newTask.boardId"
            >
              <v-icon left>mdi-plus</v-icon>
              일정 생성
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- 보드 추가 모달 -->
    <v-dialog v-model="showBoardModal" max-width="500px" @click:outside="showBoardModal = false">
      <v-card class="board-modal">
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <div class="header-content">
            <div class="modal-icon">
              <v-icon color="primary">mdi-folder-plus</v-icon>
            </div>
            <div class="header-text">
              <h2 class="modal-title">새 보드 추가</h2>
              <p class="modal-subtitle">프로젝트를 위한 보드를 생성하세요</p>
            </div>
          </div>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="showBoardModal = false"
            class="close-btn"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <!-- 모달 컨텐츠 -->
        <div class="modal-body">
          <v-form @submit.prevent="addBoard" class="board-form">
            <!-- 보드 이름 섹션 -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">기본 정보</h3>
              </div>
              <div class="form-content">
                <div class="input-group">
                  <label class="input-label">보드 이름 *</label>
            <v-text-field
              v-model="newBoard.name"
              variant="outlined"
              required
                    placeholder="보드 이름을 입력하세요"
                    class="modern-input"
                    :rules="[v => !!v || '보드 이름은 필수입니다']"
                    hide-details="auto"
                  />
                </div>
              </div>
            </div>

            <!-- 색상 선택 섹션 -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">색상 선택</h3>
              </div>
              <div class="form-content">
            <div class="color-picker">
              <div class="color-options">
                <div
                  v-for="color in boardColors"
                  :key="color"
                  class="color-option"
                  :class="{ 'selected': newBoard.color === color }"
                  :style="{ backgroundColor: color }"
                  @click="newBoard.color = color"
                    >
                      <v-icon v-if="newBoard.color === color" size="20" color="white">mdi-check</v-icon>
              </div>
            </div>
                  <div class="selected-color-preview">
                    <div class="preview-label">선택된 색상:</div>
                    <div class="color-preview" :style="{ backgroundColor: newBoard.color }"></div>
                  </div>
                </div>
              </div>
            </div>
          </v-form>
        </div>

        <!-- 모달 푸터 -->
        <div class="modal-footer">
          <div class="footer-left">
            <div class="board-preview" v-if="newBoard.name">
              <v-icon size="16">mdi-folder</v-icon>
              <span>{{ newBoard.name }}</span>
            </div>
          </div>
          <div class="footer-actions">
            <v-btn
              variant="outlined"
              @click="showBoardModal = false"
              class="cancel-btn"
            >
              <v-icon left>mdi-close</v-icon>
              취소
            </v-btn>
            <v-btn
              color="primary"
              @click="addBoard"
              class="create-btn"
              :disabled="!newBoard.name"
            >
              <v-icon left>mdi-plus</v-icon>
              보드 생성
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- 일정 상세 모달 -->
    <v-dialog v-model="showTaskDetailModal" max-width="600px" @click:outside="showTaskDetailModal = false">
      <v-card class="task-detail-modal" v-if="selectedTask">
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <div class="header-content">
            <div class="modal-icon">
              <v-icon color="primary">mdi-calendar-text</v-icon>
            </div>
            <div class="header-text">
              <h2 class="modal-title">{{ selectedTask.title }}</h2>
              <p class="modal-subtitle">일정 상세 정보를 확인하세요</p>
            </div>
          </div>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="showTaskDetailModal = false"
            class="close-btn"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <!-- 모달 컨텐츠 -->
        <div class="modal-body">
          <div class="task-detail-form">
            <!-- 설명 섹션 -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">설명</h3>
              </div>
              <div class="form-content">
                <div class="description-display">
                  <p>{{ selectedTask.description || '설명이 없습니다.' }}</p>
                </div>
              </div>
            </div>

            <!-- 일정 정보 섹션 -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">일정 정보</h3>
              </div>
              <div class="form-content">
                <div class="form-row">
                  <div class="input-group">
                    <label class="input-label">보드</label>
                    <v-select
                      :model-value="selectedTask.boardId"
                      :items="boards.map(b => ({ value: b.id, text: b.name }))"
                      variant="outlined"
                      density="compact"
                      @update:model-value="moveTask(selectedTask.id, $event)"
                      class="modern-select"
                      hide-details
                    />
                  </div>
                  
                  <div class="input-group">
                    <label class="input-label">담당자</label>
                    <div class="assignee-display">
                      <div class="assignee-avatar">{{ selectedTask.assignee.charAt(0) }}</div>
                      <span class="assignee-name">{{ selectedTask.assignee }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="input-group">
                    <label class="input-label">시작일</label>
                    <div class="date-display">
                      <v-icon size="16" color="primary">mdi-calendar-start</v-icon>
                      <span>{{ formatDate(selectedTask.startDate) }}</span>
                    </div>
                  </div>
                  
                  <div class="input-group">
                    <label class="input-label">종료일</label>
                    <div class="date-display">
                      <v-icon size="16" color="primary">mdi-calendar-end</v-icon>
                      <span>{{ formatDate(selectedTask.endDate) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 모달 푸터 -->
        <div class="modal-footer">
          <div class="footer-left">
            <div class="task-preview">
              <v-icon size="16">mdi-calendar</v-icon>
              <span>{{ selectedTask.title }}</span>
            </div>
          </div>
          <div class="footer-actions">
            <v-btn
              variant="outlined"
              @click="showTaskDetailModal = false"
              class="cancel-btn"
            >
              <v-icon left>mdi-close</v-icon>
              닫기
            </v-btn>
            <v-btn
              color="primary"
              @click="editTask(selectedTask)"
              class="edit-btn"
            >
              <v-icon left>mdi-pencil</v-icon>
              수정
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- 날짜별 이벤트 모달 -->
    <v-dialog v-model="showDayEventsModal" max-width="600px" @click:outside="closeDayEventsModal">
      <v-card class="day-events-modal" v-if="selectedDay">
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <div class="header-content">
            <div class="header-left">
              <v-icon class="header-icon">mdi-calendar-today</v-icon>
              <div class="header-text">
                <h2 class="modal-title">{{ selectedDay.getMonth() + 1 }}월 {{ selectedDay.getDate() }}일</h2>
                <p class="modal-subtitle">{{ selectedDayEvents.length }}개의 일정이 있습니다</p>
              </div>
            </div>
            <v-btn 
              icon
              variant="text"
              @click="closeDayEventsModal"
              class="close-btn"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>

        <v-divider />
        
        <div class="modal-content">
          <div class="day-events-list">
            <div
              v-for="task in selectedDayEvents"
              :key="task.id"
              class="day-event-item"
              :style="{ backgroundColor: boards.find(b => b.id === task.boardId)?.color }"
              @click="viewTaskDetail(task); closeDayEventsModal()"
            >
              <div class="event-icon">
                <v-icon v-if="task.priority === 'high'">mdi-flag</v-icon>
                <v-icon v-else-if="task.priority === 'medium'">mdi-checkbox-marked-circle</v-icon>
                <v-icon v-else>mdi-circle</v-icon>
              </div>
              <div class="event-content">
                <div class="event-title">{{ task.title }}</div>
                <div class="event-dates">{{ formatDate(task.startDate) }} - {{ formatDate(task.endDate) }}</div>
              </div>
              <div class="event-assignee">
                <div class="assignee-avatar">{{ task.assignee.charAt(0) }}</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.personal-calendar {
  padding: 20px;
  min-height: calc(100vh - 60px);
  height: calc(100vh - 60px);
  background: #f8f9fa;
  overflow: auto;
  transition: all 0.3s ease;
  scrollbar-width: thin;
  scrollbar-color: #e0e0e0 transparent;
}

.personal-calendar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.personal-calendar::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.personal-calendar::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 4px;
}

.personal-calendar::-webkit-scrollbar-thumb:hover {
  background: #bdbdbd;
}

.personal-calendar.dark-mode {
  background: #121212;
}

/* 헤더 */
.calendar-header {
  margin-bottom: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-left {
  flex: 1;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.view-icons {
  display: flex;
  gap: 4px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
}

.view-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-icon-btn:hover {
  background: rgba(25, 118, 210, 0.1);
  color: #1976d2;
}

.view-icon-btn.active {
  background: #1976d2;
  color: white;
  box-shadow: 0 2px 4px rgba(25, 118, 210, 0.2);
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
  transition: color 0.3s ease;
  line-height: 1.2;
}

.dark-mode .page-title {
  color: #ffffff;
}

.page-subtitle {
  color: #666666;
  font-size: 16px;
  font-weight: 400;
  margin-left: 12px;
  transition: color 0.3s ease;
}

.dark-mode .page-subtitle {
  color: #cccccc;
}

.add-task-btn {
  background: #1976d2 !important;
  color: white !important;
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  padding: 12px 24px;
}


/* 메인 콘텐츠 */
.main-content {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 24px 24px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: calc(100vh - 200px);
}

.dark-mode .main-content {
  background: #1e1e1e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  border: 1px solid #333;
}

/* 보드 뷰 */
.boards-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  min-height: 0;
}

.search-filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-shrink: 0;
  position: relative;
}

.search-container {
  flex: 1;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: 20px;
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 8px 16px 8px 48px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.2);
  border-radius: 20px;
  background: rgba(var(--v-theme-surface), 0.8);
  color: rgb(var(--v-theme-on-surface));
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-surface), 1);
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.1);
  outline: none;
}

.search-input::placeholder {
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.boards-container {
  display: flex;
  gap: 16px;
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  padding-bottom: 16px;
  min-height: 300px;
  max-height: calc(100vh - 300px);
  scrollbar-width: thin;
  scrollbar-color: #e0e0e0 transparent;
}

.boards-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.boards-container::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.boards-container::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 4px;
}

.boards-container::-webkit-scrollbar-thumb:hover {
  background: #bdbdbd;
}

.board-column {
  min-width: 300px;
  width: 300px;
  background: var(--board-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-shrink: 0;
  transition: all 0.3s ease;
  position: relative;
}

.board-column:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.board-column.dragging {
  opacity: 0.7;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.board-column.dragging-over {
  border: 2px dashed #1976d2;
  background: rgba(25, 118, 210, 0.1);
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(25, 118, 210, 0.3);
  position: relative;
  z-index: 999;
}

.board-column.dragging-over::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(25, 118, 210, 0.2) 50%, transparent 70%);
  animation: shimmer 2s infinite;
  pointer-events: none;
  border-radius: 8px;
}

.board-column.dragging-over::after {
  content: '여기에 놓으세요';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(25, 118, 210, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
  z-index: 1001;
  animation: pulse 1s infinite;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
  white-space: nowrap;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.9;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.board-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.board-right-section {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.board-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: rgba(0, 0, 0, 0.4);
  cursor: grab;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.drag-handle:hover {
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.6);
}

.drag-handle:active {
  cursor: grabbing;
}

.board-name-input {
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  flex: 1;
  min-width: 0;
  max-width: 120px;
}

.board-name-input:focus {
  background: rgba(255, 255, 255, 0.5);
  outline: none;
}

.task-count {
  background: #1976d2;
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.board-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.task-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
  line-height: 1.4;
}

.task-dates {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.task-description {
  font-size: 12px;
  color: #888;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}


.add-task-to-board-btn {
  width: 100%;
  padding: 12px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  background: transparent;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.add-task-to-board-btn:hover {
  border-color: #1976d2;
  color: #1976d2;
  background: rgba(25, 118, 210, 0.05);
}

/* 타임라인 뷰 */
.timeline-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  gap: 16px;
}

.timeline-search {
  flex: 1;
}

.timeline-filters {
  display: flex;
  flex-shrink: 0;
  gap: 12px;
  align-items: center;
  position: relative;
}

.multi-filter-btn {
  position: relative;
}

/* board-filter-select 제거됨 */

.multi-filter-btn {
  text-transform: none;
  font-weight: 500;
}

.multi-filter-btn.active {
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

.multi-filter-btn.filtered {
  background: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(var(--v-theme-primary), 0.3);
}

.multi-filter-btn.filtered .v-icon {
  color: white !important;
}

.multi-filter-btn.filtered .filter-count-chip {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

.filter-count-chip {
  margin-left: 8px;
  min-width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 600;
}

/* 다중 필터 드롭다운 */
.multi-filter-dropdown {
  position: fixed;
  top: 270px;
  right: 40px;
  z-index: 9999;
  min-width: 400px;
  max-width: 500px;
}

.filter-dropdown-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid #e0e0e0;
  overflow: hidden;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 선택된 필터 표시 */
.active-filters {
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.active-filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.active-filter-tags .v-chip {
  font-size: 11px;
  font-weight: 500;
  height: 24px;
}

/* 필터 옵션들 */
.filter-options {
  padding: 16px;
  max-height: 300px;
  overflow-y: auto;
}

.filter-group {
  width: 100%;
}

.filter-group h5 {
  margin: 0 0 12px 0;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-checkboxes .v-checkbox {
  margin: 0;
  min-height: 28px;
}

.filter-checkboxes .v-checkbox :deep(.v-label) {
  font-size: 12px;
  color: #666;
}

/* 필터 액션 */
.filter-actions {
  padding: 12px 16px;
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.filter-mode {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-mode :deep(.v-radio-group) {
  margin: 0;
}

.filter-mode :deep(.v-radio) {
  margin: 0;
}

.filter-mode :deep(.v-label) {
  font-size: 12px;
  color: #666;
}

/* 다크 모드 지원 */
.dark-mode .filter-dropdown-content {
  background: #2d2d2d;
  border-color: #444;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.dark-mode .active-filters {
  background: #1e1e1e;
  border-color: #444;
}

.dark-mode .filter-group {
  border-color: #444;
}

.dark-mode .filter-group h5 {
  color: #fff;
}

.dark-mode .filter-checkboxes .v-checkbox :deep(.v-label) {
  color: #ccc;
}

.dark-mode .filter-actions {
  background: #1e1e1e;
  border-color: #444;
}

.dark-mode .filter-mode :deep(.v-label) {
  color: #ccc;
}

/* 다크 모드에서 필터 버튼 스타일 */
.dark-mode .multi-filter-btn.filtered {
  background: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(var(--v-theme-primary), 0.4);
}

.dark-mode .multi-filter-btn.filtered .v-icon {
  color: white !important;
}

.dark-mode .multi-filter-btn.filtered .filter-count-chip {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

/* 다크 모드에서 검색 입력 스타일 */
.dark-mode .search-input {
  background: rgba(30, 30, 30, 0.8);
  border-color: #444;
  color: #fff;
}

.dark-mode .search-input:focus {
  background: rgba(30, 30, 30, 1);
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.2);
}

.dark-mode .search-input::placeholder {
  color: #888;
}

.dark-mode .search-icon {
  color: #888;
}

/* 다크 모드에서 뷰 아이콘 버튼 스타일 */
.dark-mode .view-icons {
  background: #2d2d2d;
}

.dark-mode .view-icon-btn {
  color: #ccc;
}

.dark-mode .view-icon-btn:hover {
  background: rgba(25, 118, 210, 0.2);
  color: #1976d2;
}

.dark-mode .view-icon-btn.active {
  background: #1976d2;
  color: white;
}

/* 다크 모드에서 뷰 모드 버튼 스타일 */
.dark-mode .view-mode-buttons {
  background: #2d2d2d;
}

.dark-mode .view-mode-btn {
  color: #ccc;
}

.dark-mode .view-mode-btn:hover {
  background: #444;
}

.dark-mode .view-mode-btn.active {
  background: #1976d2;
  color: white;
}

/* 다크 모드에서 타임라인 그리드 스타일 */
.dark-mode .timeline-grid {
  background: #1e1e1e;
  border-color: #444;
}

.dark-mode .timeline-task-column {
  background: #121212;
  border-color: #444;
}

.dark-mode .timeline-task-header {
  background: #2d2d2d;
  border-color: #444;
  color: #fff;
}

.dark-mode .timeline-task-row {
  border-color: #333;
  color: #fff;
}

.dark-mode .timeline-task-row:hover {
  background: #2d2d2d;
}

.dark-mode .timeline-date-header {
  background: #2d2d2d;
  border-color: #444;
  color: #fff;
}

.dark-mode .timeline-date-cell {
  border-color: #333;
}

.dark-mode .timeline-date-cell:hover {
  background: #2d2d2d;
}

.dark-mode .timeline-date-cell.has-task {
  background: rgba(25, 118, 210, 0.1);
}

/* 다크 모드에서 캘린더 스타일 */
.dark-mode .calendar-nav h3 {
  color: #fff;
}

.dark-mode .weekday {
  background: #2d2d2d;
  color: #ccc;
}

.dark-mode .calendar-day {
  background: #1e1e1e;
  border-color: #444;
  color: #fff;
}

.dark-mode .calendar-day:hover {
  background: #2d2d2d;
}

.dark-mode .calendar-day.other-month {
  background: #121212;
  color: #666;
}

.dark-mode .calendar-day.today {
  background: rgba(25, 118, 210, 0.2);
  border-color: #1976d2;
}

.dark-mode .more-tasks-btn {
  background: #2d2d2d;
  color: #ccc;
  border-color: #444;
}

.dark-mode .more-tasks-btn:hover {
  background: #444;
  color: #fff;
}

/* 다크 모드에서 보드 스타일 */
.dark-mode .board-name-input {
  color: #000000;
}

.dark-mode .board-name-input:focus {
  background: rgba(255, 255, 255, 0.1);
}

.dark-mode .task-count {
  background: #1976d2;
  color: #ffffff;
}

.dark-mode .task-card {
  background: #2d2d2d;
  color: #fff;
}

.dark-mode .task-card:hover {
  background: #333;
}

.dark-mode .task-title {
  color: #fff;
}

.dark-mode .task-dates {
  color: #ccc;
}

.dark-mode .task-description {
  color: #999;
}

.dark-mode .add-task-to-board-btn {
  border-color: #444;
  color: #000000;
}

.dark-mode .add-task-to-board-btn:hover {
  border-color: #1976d2;
  color: #000000;
  background: rgba(25, 118, 210, 0.1);
}

.dark-mode .add-task-to-board-btn .v-icon {
  color: #000000 !important;
}

.dark-mode .drag-handle {
  color: #000000;
  background: rgba(255, 255, 255, 0.1);
}

.dark-mode .drag-handle:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #000000;
}

.dark-mode .board-column.dragging-over {
  border-color: #64b5f6;
  background: rgba(100, 181, 246, 0.1);
  box-shadow: 0 0 20px rgba(100, 181, 246, 0.3);
}

.dark-mode .board-column.dragging-over::after {
  background: rgba(100, 181, 246, 0.9);
  box-shadow: 0 4px 12px rgba(100, 181, 246, 0.4);
}

/* 다크 모드에서 모달 스타일 */
.dark-mode .modal-header {
  background: #121212;
  border-color: #444;
}

.dark-mode .modal-title {
  color: #fff;
}

.dark-mode .color-label {
  color: #fff;
}

.dark-mode .task-detail-content h4 {
  color: #fff;
}

.dark-mode .task-detail-content p {
  color: #ccc;
}

.dark-mode .info-item label {
  color: #fff;
}

.dark-mode .info-item span {
  color: #ccc;
}

.dark-mode .day-event-item {
  background: #2d2d2d;
  border-color: #444;
}

.dark-mode .event-title {
  color: #fff;
}

.dark-mode .event-dates {
  color: #ccc;
}

/* 다크 모드에서 캘린더 일정 텍스트 색상 */
.dark-mode .day-task {
  color: #000000 !important;
}

/* 다크 모드에서 스크롤바 스타일 */
.dark-mode::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.dark-mode::-webkit-scrollbar-thumb {
  background: #444;
}

.dark-mode::-webkit-scrollbar-thumb:hover {
  background: #666;
}

.dark-mode .boards-container::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.dark-mode .boards-container::-webkit-scrollbar-thumb {
  background: #444;
}

.dark-mode .boards-container::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .multi-filter-dropdown {
    top: 100px;
    right: 20px;
    left: 20px;
    min-width: auto;
    max-width: none;
  }
  
  .filter-options {
    max-height: 200px;
  }
  
  .filter-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
}

/* 뷰 모드 컨트롤 */
.timeline-view-controls {
  margin-bottom: 20px;
}

.view-mode-buttons {
  display: flex;
  gap: 4px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
}

.view-mode-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-mode-btn:hover {
  background: #e0e0e0;
}

.view-mode-btn.active {
  background: #1976d2;
  color: white;
  box-shadow: 0 2px 4px rgba(25, 118, 210, 0.2);
}

.timeline-content {
  flex: 1;
  overflow: auto;
  min-height: 0;
}

.timeline-grid {
  display: flex;
  min-width: 100%;
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  align-items: stretch;
}

/* 왼쪽 업무 항목 컬럼 */
.timeline-task-column {
  width: 300px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.timeline-task-header {
  padding: 16px 20px;
  background: #e9ecef;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.timeline-task-list {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.timeline-task-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 50px;
  flex: 1;
}

.timeline-task-row:hover {
  background: #e9ecef;
}

.timeline-task-row:last-child {
  border-bottom: none;
}

.task-title {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}

.task-color-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: 12px;
}

/* 오른쪽 날짜 컬럼들 */
.timeline-date-columns {
  display: flex;
  flex: 1;
  overflow-x: auto;
  align-items: stretch;
}

.timeline-date-column {
  min-width: 120px;
  border-right: 1px solid #e0e0e0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.timeline-date-column:last-child {
  border-right: none;
}

.timeline-date-header {
  padding: 16px 12px;
  background: #e9ecef;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  text-align: center;
}

.timeline-date-cells {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.timeline-date-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 50px;
  position: relative;
  flex: 1;
}

.timeline-date-cell:hover {
  background: #f8f9fa;
}

.timeline-date-cell:last-child {
  border-bottom: none;
}

.timeline-date-cell.has-task {
  background: rgba(25, 118, 210, 0.05);
}

.task-bar {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.timeline-date-cell:hover .task-bar {
  height: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}



/* 캘린더 뷰 */
.calendar-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  min-height: 0;
}

.calendar-header-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.calendar-title {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
}

.calendar-title h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
}

.today-button {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.today-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background: #e9ecef;
  border-color: #ccc;
  color: #333;
  transform: translateY(-1px);
}


/* 다크모드 지원 */
.personal-calendar.dark-mode .calendar-title h3 {
  color: #ffffff;
}

.personal-calendar.dark-mode .nav-button {
  background: #3d3d3d;
  border-color: #555;
  color: #cccccc;
}

.personal-calendar.dark-mode .nav-button:hover {
  background: #4d4d4d;
  border-color: #666;
  color: #ffffff;
}

.calendar-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 8px;
}

.weekday {
  padding: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  background: #f5f5f5;
  border-radius: 4px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  flex: 1;
  overflow: hidden;
}

.calendar-day {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 8px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.calendar-day:hover {
  background: #f8f9fa;
}

.calendar-day.other-month {
  background: #f8f9fa;
  color: #ccc;
}

.calendar-day.today {
  background: #e3f2fd;
  border-color: #1976d2;
}

.day-number {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.day-tasks {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.day-task {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.day-task:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 연속 일정 스타일 */
.day-task.continuous-task {
  border-radius: 0;
  margin: 0;
}

.day-task.continuous-start {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.day-task.continuous-end {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

/* 더보기 버튼 */
.more-tasks-btn {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f0f0f0;
  color: #666;
  text-align: center;
  margin-top: 2px;
  border: 1px solid #e0e0e0;
}

.more-tasks-btn:hover {
  background: #e0e0e0;
  color: #333;
  transform: scale(1.02);
}

/* 날짜별 이벤트 모달 */
.day-events-modal {
  border-radius: 16px !important;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.modal-header {
  padding: 24px 24px 16px;
  background: rgb(var(--v-theme-surface));
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  font-size: 24px;
  color: rgb(var(--v-theme-primary));
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: -0.025em;
}

.modal-subtitle {
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin: 0;
}

.close-btn {
  color: rgba(var(--v-theme-on-surface), 0.6) !important;
  background: rgba(var(--v-theme-on-surface), 0.08) !important;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
}

.close-btn:hover {
  background: rgba(var(--v-theme-on-surface), 0.12) !important;
  color: rgb(var(--v-theme-on-surface)) !important;
}

.day-events-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.day-event-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.day-event-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.event-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #666;
}

.event-content {
  flex: 1;
}

.event-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.event-dates {
  font-size: 12px;
  color: #666;
}

.event-assignee {
  display: flex;
  align-items: center;
}

.assignee-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1976d2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

/* 지라 스타일 모달 */
.jira-modal {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.jira-modal .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  background: #ffffff;
  border-bottom: 1px solid #e1e5e9;
  min-height: 80px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.modal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f4f5f7;
  border-radius: 8px;
}

.header-text {
  flex: 1;
}

.modal-title {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
  color: #172b4d;
  line-height: 1.2;
}

.modal-subtitle {
  margin: 0;
  font-size: 14px;
  color: #6b778c;
  line-height: 1.4;
}

.close-btn {
  color: #6b778c !important;
}

.close-btn:hover {
  background: #f4f5f7 !important;
  color: #172b4d !important;
}

.modal-body {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  max-height: calc(90vh - 160px);
}

.task-form {
  padding: 0;
}

.form-section {
  border-bottom: 1px solid #e1e5e9;
  padding: 24px 32px;
}

.form-section:last-child {
  border-bottom: none;
}

.section-header {
  margin-bottom: 20px;
}

.section-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #172b4d;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 16px;
  background: #0052cc;
  border-radius: 2px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* 디자이너스러운 입력 필드 스타일 */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 4px;
}

.modern-input :deep(.v-field) {
  border-radius: 8px;
  border: 2px solid #e1e5e9;
  transition: all 0.2s ease;
  background: #ffffff;
}

.modern-input :deep(.v-field--focused) {
  border-color: #0052cc;
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
}

.modern-input :deep(.v-field__input) {
  font-size: 15px;
  font-weight: 400;
  padding: 12px 16px;
  color: #172b4d;
}

.modern-input :deep(.v-field__outline) {
  display: none;
}

.modern-textarea :deep(.v-field) {
  border-radius: 8px;
  border: 2px solid #e1e5e9;
  transition: all 0.2s ease;
  background: #ffffff;
}

.modern-textarea :deep(.v-field--focused) {
  border-color: #0052cc;
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
}

.modern-textarea :deep(.v-field__input) {
  font-size: 15px;
  font-weight: 400;
  padding: 12px 16px;
  color: #172b4d;
  line-height: 1.5;
}

.modern-textarea :deep(.v-field__outline) {
  display: none;
}

.modern-select :deep(.v-field) {
  border-radius: 8px;
  border: 2px solid #e1e5e9;
  transition: all 0.2s ease;
  background: #ffffff;
}

.modern-select :deep(.v-field--focused) {
  border-color: #0052cc;
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
}

.modern-select :deep(.v-field__input) {
  font-size: 15px;
  font-weight: 400;
  padding: 12px 16px;
  color: #172b4d;
}

.modern-select :deep(.v-field__outline) {
  display: none;
}

.assignee-display {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8f9fa;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  min-height: 56px;
}

.assignee-avatar {
  flex-shrink: 0;
}

.assignee-name {
  font-size: 15px;
  font-weight: 500;
  color: #172b4d;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #f4f5f7;
  border-top: 1px solid #e1e5e9;
  min-height: 64px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.board-chip {
  font-weight: 500;
  border-radius: 6px;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cancel-btn {
  text-transform: none;
  font-weight: 500;
  border-radius: 6px;
  color: #6b778c !important;
  border-color: #e1e5e9 !important;
}

.cancel-btn:hover {
  background: #f4f5f7 !important;
  border-color: #c1c7d0 !important;
}

.create-btn {
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  background: #0052cc !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0, 82, 204, 0.2);
  padding: 12px 24px;
  font-size: 15px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.create-btn:hover {
  background: #0065ff !important;
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
  transform: translateY(-1px);
}

.create-btn:disabled {
  background: #c1c7d0 !important;
  color: #a5adba !important;
  box-shadow: none;
  transform: none;
}

.create-btn :deep(.v-btn__content) {
  color: #ffffff !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.create-btn :deep(.v-icon) {
  color: #ffffff !important;
  margin: 0;
}

/* 다크모드 */
.dark-mode .jira-modal {
  background: #1e1e1e;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.dark-mode .modal-header {
  background: #2d2d2d;
  border-bottom-color: #404040;
}

.dark-mode .modal-title {
  color: #ffffff;
}

.dark-mode .modal-subtitle {
  color: #b3b3b3;
}

.dark-mode .modal-icon {
  background: #404040;
}

.dark-mode .close-btn {
  color: #b3b3b3 !important;
}

.dark-mode .close-btn:hover {
  background: #404040 !important;
  color: #ffffff !important;
}

.dark-mode .form-section {
  border-bottom-color: #404040;
}

.dark-mode .section-title {
  color: #ffffff;
}

.dark-mode .modal-footer {
  background: #2d2d2d;
  border-top-color: #404040;
}

.dark-mode .cancel-btn {
  color: #b3b3b3 !important;
  border-color: #404040 !important;
}

.dark-mode .cancel-btn:hover {
  background: #404040 !important;
  border-color: #666666 !important;
}

.dark-mode .input-label {
  color: #ffffff;
}

.dark-mode .modern-input :deep(.v-field),
.dark-mode .modern-textarea :deep(.v-field),
.dark-mode .modern-select :deep(.v-field) {
  background: #2d2d2d;
  border-color: #404040;
}

.dark-mode .modern-input :deep(.v-field--focused),
.dark-mode .modern-textarea :deep(.v-field--focused),
.dark-mode .modern-select :deep(.v-field--focused) {
  border-color: #0052cc;
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.2);
}

.dark-mode .modern-input :deep(.v-field__input),
.dark-mode .modern-textarea :deep(.v-field__input),
.dark-mode .modern-select :deep(.v-field__input) {
  color: #ffffff;
}

.dark-mode .assignee-display {
  background: #404040;
  border-color: #666666;
}

.dark-mode .assignee-name {
  color: #ffffff;
}

/* 다중필터 스타일 */
.filter-container {
  position: relative;
  flex-shrink: 0;
}

.multi-filter-btn {
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  padding: 8px 16px;
  gap: 6px;
  min-width: 100px;
  height: 36px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.multi-filter-btn.filtered {
  background: #1976d2 !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

.multi-filter-btn.active {
  background: #f8f9fa !important;
  color: #1976d2 !important;
  border-color: #1976d2 !important;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.2);
}

.multi-filter-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
}

.multi-filter-btn.filtered:hover {
  box-shadow: 0 3px 12px rgba(25, 118, 210, 0.4);
}

.filter-text {
  font-weight: 500;
}

.filter-count-chip {
  background: rgba(255, 255, 255, 0.9) !important;
  color: #1976d2 !important;
  font-weight: 600;
  font-size: 11px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.multi-filter-dropdown {
  min-width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #e1e5e9;
  overflow: hidden;
}

.filter-dropdown-content {
  padding: 0;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e5e9;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #172b4d;
}

.close-filter-btn {
  color: #6b778c !important;
}

.close-filter-btn:hover {
  background: #e9ecef !important;
  color: #172b4d !important;
}

.active-filters {
  padding: 16px 24px;
  background: #f0f8ff;
  border-bottom: 1px solid #e1e5e9;
}

.active-filters-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #1976d2;
}

.active-filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.active-filter-chip {
  border-radius: 6px !important;
  font-weight: 500;
}

.filter-options {
  padding: 20px 24px;
}

.filter-group {
  margin-bottom: 0;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.group-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
}

.filter-option-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-option:hover {
  background: #f8f9fa;
}

.option-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #e1e5e9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.option-checkbox.checked {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.option-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.option-label {
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
  flex: 1;
}

.filter-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #f8f9fa;
  border-top: 1px solid #e1e5e9;
  gap: 12px;
}

.clear-filters-btn,
.apply-filters-btn {
  border-radius: 6px;
  text-transform: none;
  font-weight: 500;
}

.clear-filters-btn {
  color: #6b778c !important;
  border-color: #e1e5e9 !important;
}

.apply-filters-btn {
  background: #1976d2 !important;
  color: white !important;
}

/* 보드 모달 스타일 */
.board-modal {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.board-modal .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  background: #ffffff;
  border-bottom: 1px solid #e1e5e9;
  min-height: 80px;
}

.board-modal .header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.board-modal .modal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f4f5f7;
  border-radius: 8px;
}

.board-modal .header-text {
  flex: 1;
}

.board-modal .modal-title {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
  color: #172b4d;
  line-height: 1.2;
}

.board-modal .modal-subtitle {
  margin: 0;
  font-size: 14px;
  color: #6b778c;
  line-height: 1.4;
}

.board-modal .modal-body {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  max-height: calc(90vh - 160px);
}

.board-form {
  padding: 0;
}

.color-picker {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.color-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.color-option {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  position: relative;
}

.color-option:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-option.selected {
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
}

.selected-color-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
}

.preview-label {
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.board-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

/* 다크모드 - 다중필터 */
.dark-mode .multi-filter-dropdown {
  background: #1e1e1e;
  border-color: #404040;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 9999;
}

.dark-mode .filter-header {
  background: #2d2d2d;
  border-bottom-color: #404040;
}

.dark-mode .filter-header h3 {
  color: #ffffff;
}

.dark-mode .active-filters {
  background: #1a2332;
  border-bottom-color: #404040;
}

.dark-mode .active-filters-header {
  color: #64b5f6;
}

.dark-mode .filter-options {
  background: #1e1e1e;
}

.dark-mode .group-header h4 {
  color: #ffffff;
}

.dark-mode .filter-option:hover {
  background: #2d2d2d;
}

.dark-mode .option-checkbox {
  border-color: #404040;
}

.dark-mode .option-checkbox.checked {
  background: #1976d2;
  border-color: #1976d2;
}

.dark-mode .option-label {
  color: #ffffff;
}

.dark-mode .filter-actions {
  background: #2d2d2d;
  border-top-color: #404040;
}

.dark-mode .clear-filters-btn {
  color: #b3b3b3 !important;
  border-color: #404040 !important;
}

/* 다크모드 - 보드 모달 */
.dark-mode .board-modal {
  background: #1e1e1e;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.dark-mode .board-modal .modal-header {
  background: #2d2d2d;
  border-bottom-color: #404040;
}

.dark-mode .board-modal .modal-title {
  color: #ffffff;
}

.dark-mode .board-modal .modal-subtitle {
  color: #b3b3b3;
}

.dark-mode .board-modal .modal-icon {
  background: #404040;
}

.dark-mode .selected-color-preview {
  background: #404040;
  border-color: #666666;
}

.dark-mode .preview-label {
  color: #ffffff;
}

.dark-mode .board-preview {
  background: #404040;
  color: #ffffff;
}

/* 일정 상세 모달 스타일 */
.task-detail-modal {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.task-detail-modal .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  background: #ffffff;
  border-bottom: 1px solid #e1e5e9;
  min-height: 80px;
}

.task-detail-modal .header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.task-detail-modal .modal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f4f5f7;
  border-radius: 8px;
}

.task-detail-modal .header-text {
  flex: 1;
}

.task-detail-modal .modal-title {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
  color: #172b4d;
  line-height: 1.2;
}

.task-detail-modal .modal-subtitle {
  margin: 0;
  font-size: 14px;
  color: #6b778c;
  line-height: 1.4;
}

.task-detail-modal .modal-body {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  max-height: calc(90vh - 160px);
}

.task-detail-form {
  padding: 0;
}

.description-display {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  min-height: 60px;
}

.description-display p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #172b4d;
}

.date-display {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

.task-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

.edit-btn {
  background: #1976d2 !important;
  color: white !important;
}

/* 다크모드 - 일정 상세 모달 */
.dark-mode .task-detail-modal {
  background: #1e1e1e;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.dark-mode .task-detail-modal .modal-header {
  background: #2d2d2d;
  border-bottom-color: #404040;
}

.dark-mode .task-detail-modal .modal-title {
  color: #ffffff;
}

.dark-mode .task-detail-modal .modal-subtitle {
  color: #b3b3b3;
}

.dark-mode .task-detail-modal .modal-icon {
  background: #404040;
}

.dark-mode .description-display {
  background: #404040;
  border-color: #666666;
}

.dark-mode .description-display p {
  color: #ffffff;
}

.dark-mode .date-display {
  background: #404040;
  border-color: #666666;
  color: #ffffff;
}

.dark-mode .task-preview {
  background: #404040;
  color: #ffffff;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .jira-modal {
    margin: 16px;
    max-width: calc(100vw - 32px);
  }
  
  .jira-modal .modal-header {
    padding: 20px 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .header-content {
    width: 100%;
  }
  
  .form-section {
    padding: 20px 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .modal-footer {
    padding: 16px 24px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .footer-left {
    justify-content: center;
  }
  
  .footer-actions {
    justify-content: center;
  }
  
  .modal-title {
    font-size: 20px;
  }
  
  .section-title {
    font-size: 14px;
  }
}

.modal-content {
  padding: 24px;
}

.date-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.color-picker {
  margin-bottom: 24px;
}

.color-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.color-options {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.selected {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.task-detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.task-detail-content h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.task-detail-content p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.info-item {
  margin-bottom: 16px;
}

.info-item label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.info-item span {
  color: #666;
  font-size: 14px;
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
  .board-column {
    min-width: 250px;
    width: 250px;
  }
}

@media (max-width: 768px) {
  .personal-calendar {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .header-right {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
  
  .view-icons {
    width: 100%;
    justify-content: center;
  }
  
  .boards-container {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  .board-column {
    min-width: auto;
    width: 100%;
  }
  
  .task-detail-content {
    grid-template-columns: 1fr;
  }
  
  .date-inputs {
    grid-template-columns: 1fr;
  }
}
</style>