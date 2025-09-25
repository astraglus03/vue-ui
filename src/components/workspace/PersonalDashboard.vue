<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  currentChannel: String
})

// 통계 데이터
const stats = ref([
  {
    title: '업무 Task',
    value: 0,
    description: '진행 중인 업무',
    icon: 'mdi-clipboard-check',
    color: 'warning'
  },
  {
    title: '친구 요청',
    value: 0,
    description: '새로운 친구 요청',
    icon: 'mdi-account-plus',
    color: 'error'
  },
  {
    title: '읽지 않은 메시지',
    value: 0,
    description: '답장을 기다리는 메시지',
    icon: 'mdi-message',
    color: 'info'
  },
  {
    title: '다가오는 일정',
    value: 0,
    description: '이번 주 예정된 일정',
    icon: 'mdi-calendar-clock',
    color: 'success'
  }
])

// 최근 활동 데이터
const recentActivities = ref([
  {
    id: 1,
    type: 'friend_request',
    message: '김민수가 친구 요청을 보냈습니다',
    time: '5분 전',
    read: false
  },
  {
    id: 2,
    type: 'message',
    message: '이지현님이 메시지를 보냈습니다',
    time: '12분 전',
    read: false
  },
  {
    id: 3,
    type: 'calendar',
    message: '내일 오후 2시 회의 일정이 있습니다',
    time: '1시간 전',
    read: true
  },
  {
    id: 4,
    type: 'message',
    message: '박서준님이 프로젝트 관련 메시지를 보냈습니다',
    time: '2시간 전',
    read: false
  },
  {
    id: 5,
    type: 'friend_request',
    message: '최유진님이 친구 요청을 보냈습니다',
    time: '3시간 전',
    read: true
  },
  {
    id: 6,
    type: 'calendar',
    message: '내일 오전 10시 팀 미팅이 있습니다',
    time: '4시간 전',
    read: false
  },
  {
    id: 7,
    type: 'message',
    message: '정민호님이 파일을 공유했습니다',
    time: '5시간 전',
    read: true
  },
  {
    id: 8,
    type: 'friend_request',
    message: '김지영님이 친구 요청을 보냈습니다',
    time: '6시간 전',
    read: false
  },
  {
    id: 9,
    type: 'calendar',
    message: '다음 주 월요일 오후 3시 프레젠테이션이 있습니다',
    time: '7시간 전',
    read: true
  },
  {
    id: 10,
    type: 'message',
    message: '이수진님이 회의록을 업로드했습니다',
    time: '8시간 전',
    read: false
  },
  {
    id: 11,
    type: 'friend_request',
    message: '강동원님이 친구 요청을 보냈습니다',
    time: '9시간 전',
    read: true
  },
  {
    id: 12,
    type: 'message',
    message: '송혜교님이 새로운 프로젝트를 제안했습니다',
    time: '10시간 전',
    read: false
  },
  {
    id: 13,
    type: 'calendar',
    message: '이번 주 금요일 오후 5시 팀 빌딩이 있습니다',
    time: '11시간 전',
    read: true
  },
  {
    id: 14,
    type: 'message',
    message: '유재석님이 회의실 예약을 요청했습니다',
    time: '12시간 전',
    read: false
  },
  {
    id: 15,
    type: 'friend_request',
    message: '전지현님이 친구 요청을 보냈습니다',
    time: '13시간 전',
    read: true
  },
  {
    id: 16,
    type: 'message',
    message: '김태희님이 보고서를 검토했습니다',
    time: '14시간 전',
    read: false
  },
  {
    id: 17,
    type: 'calendar',
    message: '다음 달 1일 오전 9시 전체 회의가 있습니다',
    time: '15시간 전',
    read: true
  },
  {
    id: 18,
    type: 'message',
    message: '이병헌님이 프로젝트 진행 상황을 공유했습니다',
    time: '16시간 전',
    read: false
  },
  {
    id: 19,
    type: 'friend_request',
    message: '한지민님이 친구 요청을 보냈습니다',
    time: '17시간 전',
    read: true
  },
  {
    id: 20,
    type: 'message',
    message: '조인성님이 새로운 기능에 대한 피드백을 남겼습니다',
    time: '18시간 전',
    read: false
  }
])

// 빠른 작업 목록
const quickActions = ref([
  {
    title: '새 친구 추가',
    icon: 'mdi-account-plus',
    action: 'add-friend'
  },
  {
    title: '일정 추가',
    icon: 'mdi-calendar-plus',
    action: 'add-schedule'
  },
  {
    title: '문서 생성',
    icon: 'mdi-file-document-plus',
    action: 'create-document'
  }
])

// 참여중인 서버 목록
const joinedServers = ref([
  {
    id: 1,
    name: 'Synco 공식 서버',
    icon: 'S',
    onlineCount: 142,
    status: 'online'
  },
  {
    id: 2,
    name: '개발자 모임',
    icon: 'D',
    onlineCount: 23,
    status: 'away'
  },
  {
    id: 3,
    name: '게임 커뮤니티',
    icon: 'G',
    onlineCount: 87,
    status: 'busy'
  },
  {
    id: 4,
    name: '디자인 스터디',
    icon: 'D',
    onlineCount: 45,
    status: 'online'
  },
  {
    id: 5,
    name: '마케팅 팀',
    icon: 'M',
    onlineCount: 12,
    status: 'away'
  },
  {
    id: 6,
    name: '프로젝트 알파',
    icon: 'A',
    onlineCount: 8,
    status: 'online'
  },
  {
    id: 7,
    name: '일본어 스터디',
    icon: 'J',
    onlineCount: 34,
    status: 'busy'
  },
  {
    id: 8,
    name: '음악 동아리',
    icon: 'M',
    onlineCount: 67,
    status: 'online'
  }
])

// 빠른 작업 실행
const executeQuickAction = (action) => {
  switch (action) {
    case 'add-friend':
      showAddFriendModal.value = true
      break
    case 'add-schedule':
      showAddScheduleModal.value = true
      break
    case 'create-document':
      console.log('문서 생성 페이지로 이동')
      break
  }
}

// 모달 관련
const showAddFriendModal = ref(false)
const showAddScheduleModal = ref(false)
const modalSearchQuery = ref('')
const modalSearchResults = ref([])

// 일정 추가 관련
const newSchedule = ref({
  title: '',
  description: '',
  boardId: '',
  assignee: '김민수',
  startDate: '',
  endDate: ''
})

// 보드 목록
const boards = ref([
  { id: 'todo', name: '해야할 일', color: '#e3f2fd' },
  { id: 'inprogress', name: '진행중', color: '#fff3e0' },
  { id: 'done', name: '완료', color: '#e8f5e8' }
])

// 일정 추가 함수들
const addSchedule = () => {
  if (!newSchedule.value.title.trim()) {
    alert('제목을 입력해주세요.')
    return
  }
  
  console.log('새 일정 추가:', newSchedule.value)
  
  // 일정 추가 로직 (실제로는 API 호출)
  // 여기서는 간단히 모달을 닫고 폼을 초기화
  showAddScheduleModal.value = false
  resetScheduleForm()
}

const resetScheduleForm = () => {
  newSchedule.value = {
    title: '',
    description: '',
    boardId: '',
    assignee: '김민수',
    startDate: '',
    endDate: ''
  }
}

const getBoardName = (boardId) => {
  const board = boards.value.find(b => b.id === boardId)
  return board ? board.name : ''
}

const getBoardColor = (boardId) => {
  const board = boards.value.find(b => b.id === boardId)
  return board ? board.color : '#e3f2fd'
}

// 새 친구 검색 (모달에서)
const searchForNewFriends = async () => {
  if (modalSearchQuery.value.trim().length < 2) {
    modalSearchResults.value = []
    return
  }
  
  // 임시 검색 결과 (실제로는 API 호출)
  const allUsers = [
    { id: 101, userId: 'hong_gildong', name: '홍길동', email: 'hong@example.com', avatar: '홍', isFriend: false },
    { id: 102, userId: 'kim_cheolsu', name: '김철수', email: 'kim@example.com', avatar: '김', isFriend: false },
    { id: 103, userId: 'lee_younghee', name: '이영희', email: 'lee@example.com', avatar: '이', isFriend: false },
    { id: 104, userId: 'park_minsu', name: '박민수', email: 'park@example.com', avatar: '박', isFriend: false },
    { id: 105, userId: 'choi_jiyoung', name: '최지영', email: 'choi@example.com', avatar: '최', isFriend: false },
    { id: 106, userId: 'jung_minho', name: '정민호', email: 'jung@example.com', avatar: '정', isFriend: false },
    { id: 107, userId: 'han_soyoung2', name: '한소영', email: 'han2@example.com', avatar: '한', isFriend: false },
    { id: 108, userId: 'yoon_donghyun2', name: '윤동현', email: 'yoon2@example.com', avatar: '윤', isFriend: false },
    { id: 109, userId: 'kang_hyunwoo', name: '강현우', email: 'kang@example.com', avatar: '강', isFriend: false },
    { id: 110, userId: 'oh_jihyun', name: '오지현', email: 'oh@example.com', avatar: '오', isFriend: false }
  ]
  
  // 회원 ID로 검색
  modalSearchResults.value = allUsers.filter(user => 
    user.userId.toLowerCase().includes(modalSearchQuery.value.toLowerCase()) ||
    user.name.toLowerCase().includes(modalSearchQuery.value.toLowerCase())
  )
}

// 친구 요청 보내기
const sendFriendRequest = (userId) => {
  const user = modalSearchResults.value.find(u => u.id === userId)
  if (user) {
    console.log(`${user.name}(${user.userId})에게 친구 요청 전송`)
    // 검색 결과에서 제거
    modalSearchResults.value = modalSearchResults.value.filter(u => u.id !== userId)
  }
}

// ESC 키로 모달 닫기
const handleKeydown = (event) => {
  if (event.key === 'Escape' && showAddFriendModal.value) {
    showAddFriendModal.value = false
    modalSearchQuery.value = ''
    modalSearchResults.value = []
  }
}

// 모달 닫기 함수
const closeModal = () => {
  showAddFriendModal.value = false
  modalSearchQuery.value = ''
  modalSearchResults.value = []
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 활동 아이콘 매핑
const getActivityIcon = (type) => {
  switch (type) {
    case 'friend_request': return 'mdi-account-plus'
    case 'message': return 'mdi-message'
    case 'calendar': return 'mdi-calendar'
    default: return 'mdi-information'
  }
}

// 활동 색상 매핑
const getActivityColor = (type) => {
  switch (type) {
    case 'friend_request': return 'warning'
    case 'message': return 'info'
    case 'calendar': return 'success'
    default: return 'grey'
  }
}
</script>

<template>
  <div class="personal-dashboard">
    <!-- 헤더 -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">내 대시보드</h1>
          <p class="page-subtitle">개인 워크스페이스에 오신 것을 환영합니다</p>
        </div>
      </div>
    </div>

    <!-- 통계 카드들 -->
    <div class="stats-grid">
      <v-card
        v-for="stat in stats"
        :key="stat.title"
        class="stat-card"
        elevation="2"
        @click="console.log(`${stat.title} 클릭됨`)"
      >
        <v-card-text>
          <div class="stat-header">
            <span class="stat-title">{{ stat.title }}</span>
            <v-icon :color="stat.color">{{ stat.icon }}</v-icon>
          </div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-description">{{ stat.description }}</div>
        </v-card-text>
      </v-card>
    </div>

    <!-- 하단 섹션 -->
    <div class="bottom-section">
      <!-- 최근 활동 -->
      <v-card class="activity-card" elevation="2">
        <v-card-title class="activity-header">
          <v-icon class="activity-icon">mdi-chart-line</v-icon>
          <span>최근 활동</span>
        </v-card-title>
        
        <v-card-text class="activity-content">
          <div v-if="recentActivities.length === 0" class="no-activity">
            <v-icon size="80" class="pulse-icon">mdi-chart-line</v-icon>
            <div class="no-activity-text">활동 내역이 없습니다</div>
            <div class="no-activity-subtitle">친구를 추가하거나 메시지를 보내보세요!</div>
          </div>
          
          <div v-else class="activity-list">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="activity-item"
              :class="{ 'unread': !activity.read }"
            >
              <v-icon 
                :color="getActivityColor(activity.type)"
                class="activity-item-icon"
              >
                {{ getActivityIcon(activity.type) }}
              </v-icon>
              <div class="activity-item-content">
                <div class="activity-message">{{ activity.message }}</div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- 오른쪽 패널 -->
      <div class="right-panel">
        <!-- 빠른 작업 -->
        <v-card class="quick-actions-card" elevation="2">
          <v-card-title>빠른 작업</v-card-title>
          <v-card-text>
            <div class="action-list">
              <div
                v-for="action in quickActions"
                :key="action.title"
                class="action-item"
                @click="executeQuickAction(action.action)"
              >
                <v-icon class="action-icon">{{ action.icon }}</v-icon>
                <span>{{ action.title }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- 참여중인 워크스페이스 -->
        <v-card class="servers-card" elevation="2">
          <v-card-title class="servers-header">
            <span>내가 참여중인 워크스페이스</span>
            <div class="workspace-count">
              <div class="count-circle">{{ joinedServers.length }}</div>
            </div>
          </v-card-title>
          
          <v-card-text class="servers-content">
            <div class="server-list">
              <div
                v-for="server in joinedServers"
                :key="server.id"
                class="server-item"
              >
                <v-avatar size="32" class="server-avatar">
                  {{ server.icon }}
                </v-avatar>
                <div class="server-info">
                  <div class="server-name">{{ server.name }}</div>
                  <div class="server-status">
                    <div 
                      class="status-dot"
                      :class="server.status"
                    />
                    <span>{{ server.onlineCount }}명 온라인</span>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <!-- 친구 추가 모달 -->
    <v-dialog v-model="showAddFriendModal" max-width="600px" @click:outside="closeModal">
      <v-card class="add-friend-modal">
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <div class="modal-header-content">
            <div class="modal-icon">
              <v-icon>mdi-account-plus</v-icon>
            </div>
            <div class="modal-title-section">
              <h3 class="modal-title">새 친구 추가</h3>
              <p class="modal-subtitle">회원 ID로 친구를 찾아보세요</p>
            </div>
          </div>
          <v-btn
            icon
            variant="text"
            class="close-btn"
            @click="closeModal"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <!-- 모달 콘텐츠 -->
        <div class="modal-content">
          <!-- 검색 섹션 -->
          <div class="modal-search-section">
            <div class="search-input-wrapper">
              <v-icon class="search-icon">mdi-magnify</v-icon>
              <input 
                v-model="modalSearchQuery"
                type="text" 
                placeholder="회원 ID로 검색..." 
                class="search-input"
                @input="searchForNewFriends"
              />
            </div>
          </div>
          
          <!-- 검색 결과 -->
          <div v-if="modalSearchResults.length > 0" class="search-results">
            <div class="results-header">
              <h4 class="results-title">검색 결과</h4>
              <span class="results-count">{{ modalSearchResults.length }}명</span>
            </div>
            <div class="results-list">
              <div
                v-for="user in modalSearchResults"
                :key="user.id"
                class="result-item"
              >
                <div class="result-avatar">
                  <v-avatar size="48" color="primary">
                    {{ user.avatar }}
                  </v-avatar>
                  <div class="online-indicator"></div>
                </div>
                <div class="result-info">
                  <div class="result-name">{{ user.name }}</div>
                  <div class="result-userid">@{{ user.userId }}</div>
                  <div class="result-email">{{ user.email }}</div>
                </div>
                <v-btn
                  color="primary"
                  size="small"
                  class="request-btn"
                  :disabled="user.isFriend"
                  @click="sendFriendRequest(user.id)"
                >
                  <v-icon left>mdi-account-plus</v-icon>
                  {{ user.isFriend ? '이미 친구' : '요청 보내기' }}
                </v-btn>
              </div>
            </div>
          </div>
          
          <!-- 빈 상태 -->
          <div v-else-if="modalSearchQuery && modalSearchResults.length === 0" class="empty-state">
            <div class="empty-icon">
              <v-icon>mdi-account-search</v-icon>
            </div>
            <h4 class="empty-title">검색 결과가 없습니다</h4>
            <p class="empty-subtitle">다른 회원 ID로 검색해보세요</p>
          </div>
          
          <!-- 초기 상태 -->
          <div v-else class="initial-state">
            <div class="initial-icon">
              <v-icon>mdi-account-search</v-icon>
            </div>
            <h4 class="initial-title">친구를 찾아보세요</h4>
            <p class="initial-subtitle">회원 ID를 입력하여 친구를 검색하고 요청을 보내세요</p>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- 일정 추가 모달 (지라 스타일) -->
    <v-dialog v-model="showAddScheduleModal" max-width="800px" @click:outside="showAddScheduleModal = false">
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
            @click="showAddScheduleModal = false"
            class="close-btn"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <!-- 모달 컨텐츠 -->
        <div class="modal-body">
          <v-form @submit.prevent="addSchedule" class="task-form">
            <!-- 제목 섹션 -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">기본 정보</h3>
              </div>
              <div class="form-content">
                <div class="input-group">
                  <label class="input-label">제목 *</label>
                  <v-text-field
                    v-model="newSchedule.title"
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
                    v-model="newSchedule.description"
                    variant="outlined"
                    rows="4"
                    placeholder="일정 내용을 입력하세요"
                    class="modern-textarea"
                    hide-details
                  />
                </div>
              </div>
            </div>

            <!-- 분류 및 담당 섹션 -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">분류 및 담당</h3>
              </div>
              <div class="form-content">
                <div class="form-row">
                  <div class="input-group">
                    <label class="input-label">보드 선택</label>
                    <v-select
                      v-model="newSchedule.boardId"
                      :items="boards.map(b => ({ value: b.id, text: b.name }))"
                      variant="outlined"
                      placeholder="보드를 선택하세요"
                      class="modern-select"
                      hide-details
                    />
                  </div>
                  
                  <div class="input-group">
                    <label class="input-label">담당자</label>
                    <div class="assignee-display">
                      <div class="assignee-avatar">{{ newSchedule.assignee.charAt(0) }}</div>
                      <span class="assignee-name">{{ newSchedule.assignee }}</span>
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
                      v-model="newSchedule.startDate"
                      type="date"
                      variant="outlined"
                      class="modern-input"
                      hide-details
                    />
                  </div>
                  
                  <div class="input-group">
                    <label class="input-label">종료일</label>
                    <v-text-field
                      v-model="newSchedule.endDate"
                      type="date"
                      variant="outlined"
                      class="modern-input"
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
            <div class="board-chip" v-if="newSchedule.boardId">
              <div class="chip-color" :style="{ backgroundColor: getBoardColor(newSchedule.boardId) }"></div>
              <span>{{ getBoardName(newSchedule.boardId) }}</span>
            </div>
          </div>
          <div class="footer-actions">
            <v-btn
              variant="outlined"
              @click="showAddScheduleModal = false"
              class="cancel-btn"
            >
              <v-icon left>mdi-close</v-icon>
              취소
            </v-btn>
            <v-btn
              color="primary"
              @click="addSchedule"
              class="create-btn"
              :disabled="!newSchedule.title"
            >
              <v-icon left>mdi-plus</v-icon>
              일정 생성
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.personal-dashboard {
  padding: 20px;
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, rgb(var(--v-theme-background)) 0%, rgb(var(--v-theme-surface)) 100%);
  width: 100%;
  box-sizing: border-box;
}

.dashboard-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  color: rgb(var(--v-theme-on-background));
}

.page-subtitle {
  color: rgb(var(--v-theme-on-surface));
  font-size: 14px;
  opacity: 0.7;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 90px;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.stat-title {
  color: rgb(var(--v-theme-on-surface));
  font-size: 13px;
  font-weight: 500;
  opacity: 0.8;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  color: rgb(var(--v-theme-on-surface));
}

.stat-description {
  color: rgb(var(--v-theme-on-surface));
  font-size: 11px;
  opacity: 0.7;
}

.bottom-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}

.activity-card,
.quick-actions-card,
.servers-card {
  border-radius: 16px;
}

.activity-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.activity-icon {
  color: rgb(var(--v-theme-primary));
}

.activity-content {
  max-height: 530px;
  overflow-y: auto;
  padding: 0 !important;
  scrollbar-width: thin;
  scrollbar-color: #c0c0c0 transparent;
}

.activity-content::-webkit-scrollbar {
  width: 8px;
}

.activity-content::-webkit-scrollbar-track {
  background: transparent;
}

.activity-content::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 2px;
}

.activity-content::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}

.no-activity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
}

.pulse-icon {
  margin-bottom: 24px;
  opacity: 0.3;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.no-activity-text {
  color: rgb(var(--v-theme-on-surface));
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
}

.no-activity-subtitle {
  color: rgb(var(--v-theme-on-surface));
  font-size: 14px;
  opacity: 0.7;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  overflow-y: auto;
  max-height: 100%;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.activity-item:nth-child(odd) {
  background: rgba(var(--v-theme-on-surface), 0.03) !important;
}

.activity-item:nth-child(even) {
  background: rgba(var(--v-theme-on-surface), 0.06) !important;
}

.activity-item.unread:nth-child(odd) {
  background: rgba(var(--v-theme-on-surface), 0.03) !important;
}

.activity-item.unread:nth-child(even) {
  background: rgba(var(--v-theme-on-surface), 0.06) !important;
}

.activity-item:hover {
  background: rgba(var(--v-theme-primary), 0.1) !important;
}

.activity-item-icon {
  flex-shrink: 0;
}

.activity-item-content {
  flex: 1;
}

.activity-message {
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 2px;
}

.activity-time {
  font-size: 12px;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: rgb(var(--v-theme-on-surface));
  cursor: pointer;
  transition: color 0.2s ease;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.action-item:last-child {
  border-bottom: none;
}

.action-item:hover {
  color: rgb(var(--v-theme-primary));
}

.action-icon {
  flex-shrink: 0;
}

.servers-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.workspace-count {
  display: flex;
  align-items: center;
}

.count-circle {
  width: 24px;
  height: 24px;
  background: rgb(var(--v-theme-primary));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
}

.servers-content {
  padding: 0 !important;
}

.server-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  padding: 16px;
  scrollbar-width: thin;
  scrollbar-color: #c0c0c0 transparent;
}

.server-list::-webkit-scrollbar {
  width: 8px;
}

.server-list::-webkit-scrollbar-track {
  background: transparent;
}

.server-list::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 2px;
}

.server-list::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}



.server-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.server-item:hover {
  background: rgba(var(--v-theme-primary), 0.05);
}

.server-avatar {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  color: white;
  font-weight: 600;
}

.server-info {
  flex: 1;
}

.server-name {
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 2px;
}

.server-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-dot.online {
  background: rgb(var(--v-theme-success));
}

.status-dot.away {
  background: rgb(var(--v-theme-warning));
}

.status-dot.busy {
  background: rgb(var(--v-theme-error));
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .bottom-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .personal-dashboard {
    padding: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 24px;
  }
}

/* 모달 스타일 */
.add-friend-modal {
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgba(var(--v-theme-primary), 0.8) 100%);
  color: white;
}

.modal-header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.modal-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-icon .v-icon {
  font-size: 24px;
  color: white;
}

.modal-title-section {
  flex: 1;
}

.modal-title {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.modal-subtitle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}

.modal-subtitle {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.close-btn {
  color: white !important;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.modal-content {
  padding: 32px;
  background: rgb(var(--v-theme-background));
}

.modal-search-section {
  margin-bottom: 24px;
}

.modal-search-section .search-container {
  width: 100%;
}

.modal-search-section .search-input {
  background: rgba(var(--v-theme-surface), 0.8);
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

/* 검색 결과 */
.search-results {
  max-height: 400px;
  overflow-y: auto;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.results-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: rgb(var(--v-theme-on-surface));
}

.results-count {
  font-size: 14px;
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  background: rgba(var(--v-theme-primary), 0.1);
  padding: 4px 12px;
  border-radius: 12px;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgb(var(--v-theme-surface));
  border-radius: 12px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: rgb(var(--v-theme-primary));
}

.dark-mode .result-item:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.result-avatar {
  position: relative;
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #4caf50;
  border: 2px solid white;
  border-radius: 50%;
}

.result-info {
  flex: 1;
}

.result-name {
  font-size: 16px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 4px;
}

.result-userid {
  font-size: 13px;
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  margin-bottom: 4px;
}

.result-email {
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.request-btn {
  border-radius: 20px;
  text-transform: none;
  font-weight: 600;
  padding: 8px 20px;
}

/* 빈 상태 */
.empty-state,
.initial-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon,
.initial-icon {
  width: 80px;
  height: 80px;
  background: rgba(var(--v-theme-primary), 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.empty-icon .v-icon,
.initial-icon .v-icon {
  font-size: 40px;
  color: rgb(var(--v-theme-primary));
}

.empty-title,
.initial-title {
  font-size: 20px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 8px 0;
}

.empty-subtitle,
.initial-subtitle {
  font-size: 16px;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin: 0;
  max-width: 300px;
  line-height: 1.5;
}

/* 지라 스타일 모달 (내 일정관리와 동일) */
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
  background: #f5f5f5 !important;
  color: #172b4d !important;
}

.jira-modal .modal-body {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  max-height: calc(90vh - 160px);
}

.task-form {
  padding: 0;
}

.form-section {
  padding: 24px 32px;
  border-bottom: 1px solid #e1e5e9;
}

.form-section:last-child {
  border-bottom: none;
}

.section-header {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #172b4d;
  margin: 0;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
  margin: 0;
}

.modern-input :deep(.v-field) {
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  background: #ffffff;
  transition: all 0.2s ease;
}

.modern-input :deep(.v-field):hover {
  border-color: #1976d2;
}

.modern-input :deep(.v-field--focused) {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
}

.modern-textarea :deep(.v-field) {
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  background: #ffffff;
  transition: all 0.2s ease;
}

.modern-textarea :deep(.v-field):hover {
  border-color: #1976d2;
}

.modern-textarea :deep(.v-field--focused) {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
}

.modern-select :deep(.v-field) {
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  background: #ffffff;
  transition: all 0.2s ease;
}

.modern-select :deep(.v-field):hover {
  border-color: #1976d2;
}

.modern-select :deep(.v-field--focused) {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
}

.assignee-display {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
}

.assignee-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1976d2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.assignee-name {
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

.jira-modal .modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: #f8f9fa;
  border-top: 1px solid #e1e5e9;
  gap: 16px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.board-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e1e5e9;
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

.chip-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cancel-btn,
.create-btn {
  border-radius: 6px;
  text-transform: none;
  font-weight: 500;
  padding: 8px 16px;
}

.cancel-btn {
  color: #6b778c !important;
  border-color: #e1e5e9 !important;
}

.create-btn {
  background: #1976d2 !important;
  color: white !important;
}

.create-btn :deep(.v-icon),
.create-btn :deep(.v-btn__content) {
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
  color: #ffffff !important;
}

.dark-mode .input-label {
  color: #ffffff;
}

.dark-mode .modern-input :deep(.v-field),
.dark-mode .modern-textarea :deep(.v-field),
.dark-mode .modern-select :deep(.v-field) {
  background: #404040;
  border-color: #666666;
  color: #ffffff;
}

.dark-mode .modern-input :deep(.v-field):hover,
.dark-mode .modern-textarea :deep(.v-field):hover,
.dark-mode .modern-select :deep(.v-field):hover {
  border-color: #1976d2;
}

.dark-mode .modern-input :deep(.v-field--focused),
.dark-mode .modern-textarea :deep(.v-field--focused),
.dark-mode .modern-select :deep(.v-field--focused) {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.dark-mode .assignee-display {
  background: #404040;
  border-color: #666666;
}

.dark-mode .assignee-name {
  color: #ffffff;
}

.dark-mode .board-chip {
  background: #404040;
  border-color: #666666;
  color: #ffffff;
}
</style>
