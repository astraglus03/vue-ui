<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  currentChannel: String,
  selectedSchedule: String // 선택된 일정 ID
})

// 현재 날짜 (2025년 7월로 설정하여 업무 데이터와 맞춤)
const currentDate = ref(new Date(2025, 6, 15)) // 2025년 7월 15일

// 현재 뷰 (boards, timeline, calendar)
const currentView = ref('boards')

// 일정별 데이터 정의
const scheduleData = {
  'general-schedule': {
    title: '일반 일정',
    boards: [
      { id: 1, name: '할 일', color: '#e3f2fd', order: 1 },
      { id: 2, name: '진행중', color: '#fff3e0', order: 2 },
      { id: 3, name: '완료', color: '#e8f5e8', order: 3 }
    ],
    tasks: [
      // 김민수 (7개)
      {
        id: 1,
        title: '팀 미팅 준비',
        description: '주간 팀 미팅 자료 준비',
        boardId: 2,
        assignee: '김민수',
        startDate: '2025-07-15',
        endDate: '2025-07-16',
        priority: 'medium'
      },
      {
        id: 2,
        title: '월간 보고서 작성',
        description: '7월 업무 실적 정리 및 보고서 작성',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-07-20',
        endDate: '2025-07-25',
        priority: 'high'
      },
      {
        id: 3,
        title: '고객 상담 일정 조율',
        description: '주요 고객사와의 상담 일정 조율',
        boardId: 2,
        assignee: '김민수',
        startDate: '2025-07-18',
        endDate: '2025-07-22',
        priority: 'high'
      },
      {
        id: 4,
        title: '팀 교육 자료 준비',
        description: '신입사원 교육용 자료 제작',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-07-25',
        endDate: '2025-07-30',
        priority: 'medium'
      },
      {
        id: 5,
        title: '프로젝트 리뷰',
        description: '진행 중인 프로젝트 현황 점검',
        boardId: 3,
        assignee: '김민수',
        startDate: '2025-07-10',
        endDate: '2025-07-12',
        priority: 'low'
      },
      {
        id: 6,
        title: '예산 계획 수립',
        description: '다음 분기 예산 계획 수립',
        boardId: 2,
        assignee: '김민수',
        startDate: '2025-07-28',
        endDate: '2025-08-05',
        priority: 'high'
      },
      {
        id: 7,
        title: '팀 워크샵 기획',
        description: '팀 단합 워크샵 기획 및 준비',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-08-01',
        endDate: '2025-08-10',
        priority: 'medium'
      },
      // 이지현 (7개)
      {
        id: 8,
        title: '마케팅 전략 수립',
        description: 'Q3 마케팅 전략 및 캠페인 기획',
        boardId: 2,
        assignee: '이지현',
        startDate: '2025-07-16',
        endDate: '2025-07-25',
        priority: 'high'
      },
      {
        id: 9,
        title: '소셜미디어 관리',
        description: '회사 소셜미디어 계정 관리 및 콘텐츠 제작',
        boardId: 2,
        assignee: '이지현',
        startDate: '2025-07-15',
        endDate: '2025-07-20',
        priority: 'medium'
      },
      {
        id: 10,
        title: '고객 설문조사',
        description: '고객 만족도 조사 및 분석',
        boardId: 1,
        assignee: '이지현',
        startDate: '2025-07-22',
        endDate: '2025-07-28',
        priority: 'high'
      },
      {
        id: 11,
        title: '브랜드 가이드라인 업데이트',
        description: '회사 브랜드 가이드라인 개정',
        boardId: 3,
        assignee: '이지현',
        startDate: '2025-07-12',
        endDate: '2025-07-18',
        priority: 'medium'
      },
      {
        id: 12,
        title: '경쟁사 분석',
        description: '주요 경쟁사 동향 분석 및 보고서 작성',
        boardId: 2,
        assignee: '이지현',
        startDate: '2025-07-30',
        endDate: '2025-08-08',
        priority: 'high'
      },
      {
        id: 13,
        title: '이벤트 기획',
        description: '고객 대상 이벤트 기획 및 준비',
        boardId: 1,
        assignee: '이지현',
        startDate: '2025-08-05',
        endDate: '2025-08-15',
        priority: 'medium'
      },
      {
        id: 14,
        title: 'PR 자료 제작',
        description: '보도자료 및 PR 자료 제작',
        boardId: 3,
        assignee: '이지현',
        startDate: '2025-07-08',
        endDate: '2025-07-14',
        priority: 'low'
      },
      // 박준호 (6개)
      {
        id: 15,
        title: '웹사이트 리뉴얼',
        description: '회사 웹사이트 UI/UX 개선 작업',
        boardId: 2,
        assignee: '박준호',
        startDate: '2025-07-01',
        endDate: '2025-07-30',
        priority: 'high'
      },
      {
        id: 16,
        title: '모바일 앱 개발',
        description: 'iOS/Android 앱 개발 및 테스트',
        boardId: 1,
        assignee: '박준호',
        startDate: '2025-07-10',
        endDate: '2025-08-15',
        priority: 'high'
      },
      {
        id: 17,
        title: 'API 문서화',
        description: '개발한 API 문서 작성 및 정리',
        boardId: 3,
        assignee: '박준호',
        startDate: '2025-07-20',
        endDate: '2025-07-25',
        priority: 'medium'
      },
      {
        id: 18,
        title: '코드 리뷰',
        description: '팀원들의 코드 리뷰 및 피드백',
        boardId: 2,
        assignee: '박준호',
        startDate: '2025-07-15',
        endDate: '2025-07-22',
        priority: 'high'
      },
      {
        id: 19,
        title: '성능 최적화',
        description: '웹사이트 및 앱 성능 최적화 작업',
        boardId: 1,
        assignee: '박준호',
        startDate: '2025-07-25',
        endDate: '2025-08-05',
        priority: 'medium'
      },
      {
        id: 20,
        title: '보안 점검',
        description: '시스템 보안 취약점 점검 및 개선',
        boardId: 2,
        assignee: '박준호',
        startDate: '2025-08-01',
        endDate: '2025-08-10',
        priority: 'high'
      }
    ]
  },
  'project-schedule': {
    title: '프로젝트 일정',
    boards: [
      { id: 1, name: '기획', color: '#e3f2fd', order: 1 },
      { id: 2, name: '개발', color: '#fff3e0', order: 2 },
      { id: 3, name: '테스트', color: '#f3e5f5', order: 3 },
      { id: 4, name: '배포', color: '#e8f5e8', order: 4 }
    ],
    tasks: [
      // 김민수 (7개)
      {
        id: 1,
        title: '프로젝트 A 기획서 작성',
        description: '신규 프로젝트 A의 상세 기획서 작성',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-07-01',
        endDate: '2025-07-10',
        priority: 'high'
      },
      {
        id: 2,
        title: '프로젝트 B 요구사항 분석',
        description: '프로젝트 B의 고객 요구사항 분석 및 정리',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-07-15',
        endDate: '2025-07-25',
        priority: 'high'
      },
      {
        id: 3,
        title: '프로젝트 C 테스트 계획 수립',
        description: '프로젝트 C의 테스트 시나리오 및 계획 수립',
        boardId: 3,
        assignee: '김민수',
        startDate: '2025-07-20',
        endDate: '2025-07-30',
        priority: 'medium'
      },
      {
        id: 4,
        title: '프로젝트 D 배포 준비',
        description: '프로젝트 D의 배포 환경 구축 및 준비',
        boardId: 4,
        assignee: '김민수',
        startDate: '2025-08-01',
        endDate: '2025-08-10',
        priority: 'high'
      },
      {
        id: 5,
        title: '프로젝트 E 리스크 분석',
        description: '프로젝트 E의 잠재적 리스크 분석 및 대응 방안',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-08-05',
        endDate: '2025-08-15',
        priority: 'medium'
      },
      {
        id: 6,
        title: '프로젝트 F 품질 관리',
        description: '프로젝트 F의 품질 기준 설정 및 관리',
        boardId: 3,
        assignee: '김민수',
        startDate: '2025-08-10',
        endDate: '2025-08-20',
        priority: 'high'
      },
      {
        id: 7,
        title: '프로젝트 G 문서화',
        description: '프로젝트 G의 기술 문서 및 매뉴얼 작성',
        boardId: 4,
        assignee: '김민수',
        startDate: '2025-08-15',
        endDate: '2025-08-25',
        priority: 'low'
      },
      // 이지현 (7개)
      {
        id: 8,
        title: '프로젝트 A UI/UX 디자인',
        description: '프로젝트 A의 사용자 인터페이스 디자인',
        boardId: 1,
        assignee: '이지현',
        startDate: '2025-07-05',
        endDate: '2025-07-20',
        priority: 'high'
      },
      {
        id: 9,
        title: '프로젝트 B 사용자 테스트',
        description: '프로젝트 B의 사용자 테스트 진행 및 분석',
        boardId: 3,
        assignee: '이지현',
        startDate: '2025-07-25',
        endDate: '2025-08-05',
        priority: 'high'
      },
      {
        id: 10,
        title: '프로젝트 C 브랜딩',
        description: '프로젝트 C의 브랜드 아이덴티티 개발',
        boardId: 1,
        assignee: '이지현',
        startDate: '2025-08-01',
        endDate: '2025-08-15',
        priority: 'medium'
      },
      {
        id: 11,
        title: '프로젝트 D 마케팅 자료',
        description: '프로젝트 D의 마케팅 및 홍보 자료 제작',
        boardId: 4,
        assignee: '이지현',
        startDate: '2025-08-10',
        endDate: '2025-08-25',
        priority: 'medium'
      },
      {
        id: 12,
        title: '프로젝트 E 접근성 개선',
        description: '프로젝트 E의 웹 접근성 개선 작업',
        boardId: 2,
        assignee: '이지현',
        startDate: '2025-08-15',
        endDate: '2025-08-30',
        priority: 'high'
      },
      {
        id: 13,
        title: '프로젝트 F 반응형 디자인',
        description: '프로젝트 F의 모바일 반응형 디자인 적용',
        boardId: 2,
        assignee: '이지현',
        startDate: '2025-08-20',
        endDate: '2025-09-05',
        priority: 'medium'
      },
      {
        id: 14,
        title: '프로젝트 G 사용자 가이드',
        description: '프로젝트 G의 사용자 가이드 및 튜토리얼 제작',
        boardId: 4,
        assignee: '이지현',
        startDate: '2025-09-01',
        endDate: '2025-09-15',
        priority: 'low'
      },
      // 박준호 (6개)
      {
        id: 15,
        title: '프로젝트 A 백엔드 개발',
        description: '프로젝트 A의 서버 사이드 개발',
        boardId: 2,
        assignee: '박준호',
        startDate: '2025-07-10',
        endDate: '2025-07-30',
        priority: 'high'
      },
      {
        id: 16,
        title: '프로젝트 B API 개발',
        description: '프로젝트 B의 RESTful API 개발',
        boardId: 2,
        assignee: '박준호',
        startDate: '2025-07-20',
        endDate: '2025-08-10',
        priority: 'high'
      },
      {
        id: 17,
        title: '프로젝트 C 데이터베이스 설계',
        description: '프로젝트 C의 데이터베이스 스키마 설계',
        boardId: 1,
        assignee: '박준호',
        startDate: '2025-08-01',
        endDate: '2025-08-15',
        priority: 'high'
      },
      {
        id: 18,
        title: '프로젝트 D 성능 최적화',
        description: '프로젝트 D의 성능 튜닝 및 최적화',
        boardId: 3,
        assignee: '박준호',
        startDate: '2025-08-10',
        endDate: '2025-08-25',
        priority: 'medium'
      },
      {
        id: 19,
        title: '프로젝트 E 보안 강화',
        description: '프로젝트 E의 보안 취약점 점검 및 개선',
        boardId: 3,
        assignee: '박준호',
        startDate: '2025-08-15',
        endDate: '2025-08-30',
        priority: 'high'
      },
      {
        id: 20,
        title: '프로젝트 F 배포 자동화',
        description: '프로젝트 F의 CI/CD 파이프라인 구축',
        boardId: 4,
        assignee: '박준호',
        startDate: '2025-08-25',
        endDate: '2025-09-10',
        priority: 'medium'
      }
    ]
  },
  'meeting-schedule': {
    title: '회의 일정',
    boards: [
      { id: 1, name: '예정', color: '#e3f2fd', order: 1 },
      { id: 2, name: '진행중', color: '#fff3e0', order: 2 },
      { id: 3, name: '완료', color: '#e8f5e8', order: 3 }
    ],
    tasks: [
      // 김민수 (7개)
      {
        id: 1,
        title: '주간 팀 미팅',
        description: '매주 화요일 오전 10시 정기 팀 미팅',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-07-16',
        endDate: '2025-07-16',
        priority: 'high'
      },
      {
        id: 2,
        title: '프로젝트 리뷰 미팅',
        description: '진행 중인 프로젝트 현황 리뷰',
        boardId: 2,
        assignee: '김민수',
        startDate: '2025-07-18',
        endDate: '2025-07-18',
        priority: 'high'
      },
      {
        id: 3,
        title: '고객사 미팅',
        description: '주요 고객사와의 정기 미팅',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-07-22',
        endDate: '2025-07-22',
        priority: 'high'
      },
      {
        id: 4,
        title: '예산 검토 미팅',
        description: '분기 예산 검토 및 조정 미팅',
        boardId: 2,
        assignee: '김민수',
        startDate: '2025-07-25',
        endDate: '2025-07-25',
        priority: 'medium'
      },
      {
        id: 5,
        title: '팀 워크샵 기획 미팅',
        description: '팀 워크샵 기획 및 준비 미팅',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-07-30',
        endDate: '2025-07-30',
        priority: 'medium'
      },
      {
        id: 6,
        title: '성과 평가 미팅',
        description: '월간 성과 평가 및 피드백 미팅',
        boardId: 3,
        assignee: '김민수',
        startDate: '2025-07-12',
        endDate: '2025-07-12',
        priority: 'high'
      },
      {
        id: 7,
        title: '전략 수립 미팅',
        description: '다음 분기 전략 수립 미팅',
        boardId: 1,
        assignee: '김민수',
        startDate: '2025-08-05',
        endDate: '2025-08-05',
        priority: 'high'
      },
      // 이지현 (7개)
      {
        id: 8,
        title: '마케팅 브레인스토밍',
        description: 'Q3 마케팅 전략 브레인스토밍 미팅',
        boardId: 2,
        assignee: '이지현',
        startDate: '2025-07-17',
        endDate: '2025-07-17',
        priority: 'high'
      },
      {
        id: 9,
        title: '디자인 리뷰 미팅',
        description: '신규 디자인 컨셉 리뷰 미팅',
        boardId: 1,
        assignee: '이지현',
        startDate: '2025-07-20',
        endDate: '2025-07-20',
        priority: 'medium'
      },
      {
        id: 10,
        title: '고객 피드백 미팅',
        description: '고객 피드백 수집 및 분석 미팅',
        boardId: 2,
        assignee: '이지현',
        startDate: '2025-07-24',
        endDate: '2025-07-24',
        priority: 'high'
      },
      {
        id: 11,
        title: '브랜드 전략 미팅',
        description: '브랜드 포지셔닝 전략 미팅',
        boardId: 1,
        assignee: '이지현',
        startDate: '2025-07-28',
        endDate: '2025-07-28',
        priority: 'medium'
      },
      {
        id: 12,
        title: '이벤트 기획 미팅',
        description: '고객 대상 이벤트 기획 미팅',
        boardId: 2,
        assignee: '이지현',
        startDate: '2025-08-01',
        endDate: '2025-08-01',
        priority: 'medium'
      },
      {
        id: 13,
        title: '경쟁사 분석 미팅',
        description: '경쟁사 동향 분석 및 대응 전략 미팅',
        boardId: 3,
        assignee: '이지현',
        startDate: '2025-07-15',
        endDate: '2025-07-15',
        priority: 'low'
      },
      {
        id: 14,
        title: 'PR 전략 미팅',
        description: 'PR 전략 수립 및 실행 계획 미팅',
        boardId: 1,
        assignee: '이지현',
        startDate: '2025-08-08',
        endDate: '2025-08-08',
        priority: 'medium'
      },
      // 박준호 (6개)
      {
        id: 15,
        title: '기술 리뷰 미팅',
        description: '신규 기술 스택 검토 미팅',
        boardId: 2,
        assignee: '박준호',
        startDate: '2025-07-19',
        endDate: '2025-07-19',
        priority: 'high'
      },
      {
        id: 16,
        title: '아키텍처 설계 미팅',
        description: '시스템 아키텍처 설계 미팅',
        boardId: 1,
        assignee: '박준호',
        startDate: '2025-07-23',
        endDate: '2025-07-23',
        priority: 'high'
      },
      {
        id: 17,
        title: '코드 리뷰 미팅',
        description: '주간 코드 리뷰 및 피드백 미팅',
        boardId: 2,
        assignee: '박준호',
        startDate: '2025-07-26',
        endDate: '2025-07-26',
        priority: 'medium'
      },
      {
        id: 18,
        title: '성능 최적화 미팅',
        description: '시스템 성능 최적화 방안 미팅',
        boardId: 3,
        assignee: '박준호',
        startDate: '2025-07-14',
        endDate: '2025-07-14',
        priority: 'low'
      },
      {
        id: 19,
        title: '보안 점검 미팅',
        description: '시스템 보안 점검 및 개선 미팅',
        boardId: 1,
        assignee: '박준호',
        startDate: '2025-08-02',
        endDate: '2025-08-02',
        priority: 'high'
      },
      {
        id: 20,
        title: '배포 전략 미팅',
        description: 'CI/CD 파이프라인 구축 미팅',
        boardId: 2,
        assignee: '박준호',
        startDate: '2025-08-06',
        endDate: '2025-08-06',
        priority: 'medium'
      }
    ]
  }
}

// 타임라인 뷰 모드 (month, week)
const timelineViewMode = ref('month')

// 드래그 앤 드롭 상태
const draggedBoard = ref(null)
const draggedOverBoard = ref(null)

// 현재 선택된 일정 데이터
const currentScheduleData = computed(() => {
  const scheduleId = props.selectedSchedule || 'general-schedule'
  return scheduleData[scheduleId] || scheduleData['general-schedule']
})

// 업무 보드 관리 (선택된 일정에 따라 동적으로 변경)
const boards = computed(() => {
  return currentScheduleData.value.boards
})

// 업무 목록 (선택된 일정에 따라 동적으로 변경)
const tasks = computed(() => {
  return currentScheduleData.value.tasks
})

// 기존 업무 목록 (2025년 7월~11월 데이터) - 참고용으로 유지
const allTasks = ref([
  // 7월 데이터
  {
    id: 1,
    title: '웹사이트 리뉴얼 프로젝트',
    description: '회사 웹사이트 UI/UX 개선 및 반응형 디자인 적용',
    boardId: 2,
    assignee: '김민수',
    startDate: '2025-07-01',
    endDate: '2025-07-15',
    createdAt: '2025-06-25',
    priority: 'high'
  },
  {
    id: 2,
    title: '고객 데이터베이스 구축',
    description: 'CRM 시스템 도입 및 고객 정보 관리 체계 구축',
    boardId: 1,
    assignee: '이지현',
    startDate: '2025-07-05',
    endDate: '2025-07-20',
    createdAt: '2025-07-01',
    priority: 'high'
  },
  {
    id: 3,
    title: '모바일 앱 개발',
    description: 'iOS/Android 앱 개발 및 스토어 출시 준비',
    boardId: 1,
    assignee: '박준호',
    startDate: '2025-07-10',
    endDate: '2025-07-25',
    createdAt: '2025-07-05',
    priority: 'high'
  },
  {
    id: 4,
    title: '마케팅 캠페인 기획',
    description: 'Q3 마케팅 전략 수립 및 캠페인 기획',
    boardId: 2,
    assignee: '이지현',
    startDate: '2025-07-15',
    endDate: '2025-08-05',
    createdAt: '2025-07-10',
    priority: 'high'
  },
  {
    id: 5,
    title: '고객 서비스 개선',
    description: '고객 문의 시스템 개선 및 응답 시간 단축',
    boardId: 2,
    assignee: '최수진',
    startDate: '2025-07-20',
    endDate: '2025-08-10',
    createdAt: '2025-07-15',
    priority: 'medium'
  },
  {
    id: 6,
    title: '재무 보고서 작성',
    description: 'Q2 재무 실적 분석 및 보고서 작성',
    boardId: 3,
    assignee: '김민수',
    startDate: '2025-07-25',
    endDate: '2025-08-15',
    createdAt: '2025-07-20',
    priority: 'high'
  },
  // 8월 데이터
  {
    id: 7,
    title: '신제품 출시 준비',
    description: '새로운 제품 출시를 위한 마케팅 및 생산 준비',
    boardId: 2,
    assignee: '이지현',
    startDate: '2025-08-01',
    endDate: '2025-08-20',
    createdAt: '2025-07-25',
    priority: 'high'
  },
  {
    id: 8,
    title: '직원 교육 프로그램',
    description: '신입 직원 온보딩 및 기존 직원 역량 강화 교육',
    boardId: 3,
    assignee: '박준호',
    startDate: '2025-08-05',
    endDate: '2025-08-25',
    createdAt: '2025-08-01',
    priority: 'high'
  },
  {
    id: 9,
    title: '고객 만족도 조사',
    description: 'Q3 고객 만족도 조사 실시 및 결과 분석',
    boardId: 2,
    assignee: '최수진',
    startDate: '2025-08-10',
    endDate: '2025-08-30',
    createdAt: '2025-08-05',
    priority: 'medium'
  },
  {
    id: 10,
    title: '시스템 보안 강화',
    description: 'IT 보안 시스템 업그레이드 및 취약점 점검',
    boardId: 1,
    assignee: '김민수',
    startDate: '2025-08-15',
    endDate: '2025-09-05',
    createdAt: '2025-08-10',
    priority: 'high'
  },
  {
    id: 11,
    title: '성과 평가 시스템 구축',
    description: '직원 성과 평가 시스템 개발 및 도입',
    boardId: 3,
    assignee: '이지현',
    startDate: '2025-08-20',
    endDate: '2025-09-10',
    createdAt: '2025-08-15',
    priority: 'medium'
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
  selectedFilterMemberIds.value = []
}

// applyFilters 함수 제거 - 실시간 필터링으로 대체

// 활성 필터가 있는지 확인
const hasActiveFilters = computed(() => {
  return selectedBoardFilters.value.length > 0 || selectedFilterMemberIds.value.length > 0
})

// 개별 필터 제거 함수
const removeBoardFilter = (boardId) => {
  const index = selectedBoardFilters.value.indexOf(boardId)
  if (index > -1) {
    selectedBoardFilters.value.splice(index, 1)
  }
}

// 팀원 필터 토글
const selectedFilterMemberIds = ref([]) // 다중 선택을 위한 배열

const toggleFilterMember = (memberId) => {
  const index = selectedFilterMemberIds.value.indexOf(memberId)
  if (index > -1) {
    // 이미 선택된 멤버면 제거
    selectedFilterMemberIds.value.splice(index, 1)
  } else {
    // 선택되지 않은 멤버면 추가
    selectedFilterMemberIds.value.push(memberId)
  }
}

// 팀 멤버 목록 (필터용)
const teamMembers = ref([
  { id: 'kim_minsu', name: '김민수', avatar: '김', color: '#673ab7', status: 'online', department: '개발' },
  { id: 'lee_jihyun', name: '이지현', avatar: '이', color: '#009688', status: 'away', department: '마케팅' },
  { id: 'park_junyoung', name: '박준영', avatar: '박', color: '#f44336', status: 'offline', department: '디자인' },
  { id: 'choi_sujin', name: '최수진', avatar: '최', color: '#2196f3', status: 'online', department: '개발' },
  { id: 'jung_hyunwoo', name: '정현우', avatar: '정', color: '#ffc107', status: 'away', department: '기획' },
  { id: 'han_soyoung', name: '한소영', avatar: '한', color: '#e91e63', status: 'online', department: '디자인' }
])

// 새 업무 데이터
const newTask = ref({
  title: '',
  description: '',
  boardId: 1,
  assignee: '김민수',
  startDate: '',
  endDate: ''
})

// 멤버 선택 옵션
const memberOptions = computed(() => {
  return teamMembers.value.map(member => ({
    title: member.name,
    value: member.name,
    ...member
  }))
})

// 달력 프로필 필터용 멤버 (공간에 따라 동적으로 배치)
const visibleMembers = computed(() => {
  return teamMembers.value
})

// 상태 색상 가져오기
const getStatusColor = (status) => {
  const colorMap = {
    'online': 'success',
    'away': 'warning',
    'busy': 'error',
    'offline': 'grey'
  }
  return colorMap[status] || 'grey'
}

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

  // 팀원 필터
  if (selectedFilterMemberIds.value.length > 0) {
    // 선택된 멤버들의 이름 목록
    const selectedMemberNames = selectedFilterMemberIds.value.map(memberId => {
      const member = teamMembers.value.find(m => m.id === memberId)
      return member ? member.name : null
    }).filter(name => name !== null)
    
    // 선택된 멤버들 중 하나라도 담당자인 업무만 필터링
    filtered = filtered.filter(task => selectedMemberNames.includes(task.assignee))
  }

  return filtered
})

// 타임라인 날짜 범위 계산 (2025년 7월 중심)
const timelineDateRange = computed(() => {
  const startDate = new Date(2025, 5, 1) // 2025년 6월 1일
  const endDate = new Date(2025, 10, 0) // 2025년 11월 30일
  
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
  if (!newTask.value.title.trim() || !newTask.value.assignee) return

  const task = {
    id: Date.now(),
    title: newTask.value.title,
    description: newTask.value.description,
    boardId: newTask.value.boardId,
    assignee: newTask.value.assignee,
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
    assignee: '김민수',
    startDate: '',
    endDate: ''
  }
  showAddTaskModal.value = false
}

// 보드 추가
const addBoard = () => {
  if (!newBoard.value.name.trim()) return
  if (boards.value.length >= 5) return // 최대 5개 보드

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

// 보드 이름 수정
const editBoardName = (boardId, newName) => {
  const board = boards.value.find(b => b.id === boardId)
  if (board) {
    board.name = newName
  }
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
  return filteredTasks.value.filter(task => 
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

// 업무 제목 자르기
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
          <h1 class="page-title">{{ currentScheduleData.title }}</h1>
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
              :class="{ 'active': currentView === 'timeline' }"
              @click="currentView = 'timeline'"
              title="타임라인"
            >
              <v-icon size="20">mdi-timeline</v-icon>
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
            업무 추가
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

          <!-- 프로필 필터 -->
          <div class="calendar-profile-filter">
            <div class="profile-avatars-container">
              <div
                v-for="(member, index) in teamMembers"
                :key="member.id"
                class="profile-avatar"
                :class="{ 'active': selectedFilterMemberIds.includes(member.id) }"
                @click="toggleFilterMember(member.id)"
                :style="{ 
                  backgroundColor: member.color,
                  zIndex: teamMembers.length - index
                }"
              >
                <span class="text-white text-caption">{{ member.avatar }}</span>
              </div>
            </div>
          </div>

          <v-btn
            color="primary"
            variant="outlined"
            size="small"
            @click="showBoardModal = true"
            :disabled="boards.length >= 5"
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
                <div class="board-actions" @mousedown.stop>
                  <span class="task-count">{{ getTasksByBoard(board.id).length }}</span>
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
              >
                <v-icon size="16">mdi-plus</v-icon>
                만들기
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 타임라인 뷰 -->
      <div v-if="currentView === 'timeline'" class="timeline-view" @click="showMultiFilter = false">
        <!-- 타임라인 헤더 -->
        <div class="timeline-header">
          <div class="timeline-search">
            <div class="search-input-wrapper">
              <v-icon class="search-icon">mdi-magnify</v-icon>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="일정 타임라인 검색" 
                class="search-input"
              />
            </div>
          </div>
          
          <!-- 필터 섹션 -->
          <div class="timeline-filters" @click.stop>
            <!-- 다중 필터 버튼 -->
            <div class="filter-container">
            <v-btn
              :variant="hasActiveFilters ? 'flat' : 'outlined'"
              :color="hasActiveFilters ? 'primary' : undefined"
              size="small"
                @click.stop="toggleMultiFilter"
              class="multi-filter-btn"
              :class="{ 'active': showMultiFilter, 'filtered': hasActiveFilters }"
            >
                <v-icon>mdi-tune</v-icon>
                <span class="filter-text">필터</span>
              <v-chip
                v-if="hasActiveFilters"
                size="x-small"
                  color="white"
                class="filter-count-chip"
              >
                {{ selectedBoardFilters.length + selectedFilterMemberIds.length }}
              </v-chip>
                <v-icon v-if="showMultiFilter" size="16">mdi-chevron-up</v-icon>
                <v-icon v-else size="16">mdi-chevron-down</v-icon>
            </v-btn>
            </div>
          </div>
        </div>

        <!-- 다중 필터 드롭다운 패널 -->
        <div v-if="showMultiFilter" class="multi-filter-dropdown" :style="filterDropdownStyle" @click.stop>
          <div class="filter-dropdown-content">
            <!-- 필터 헤더 -->
            <div class="filter-header">
              <div class="header-left">
                <v-icon color="primary" size="20">mdi-tune</v-icon>
                <h3>필터 옵션</h3>
              </div>
              <v-btn
                icon
                size="small"
                variant="text"
                @click="showMultiFilter = false"
                class="close-filter-btn"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

            <!-- 선택된 필터 표시 -->
            <div v-if="selectedBoardFilters.length > 0 || selectedFilterMemberIds.length > 0" class="active-filters">
              <div class="active-filters-header">
                <v-icon size="16">mdi-check-circle</v-icon>
                <span>선택된 필터</span>
              </div>
              <div class="active-filter-tags">
                <v-chip
                  v-for="boardId in selectedBoardFilters"
                  :key="`board-${boardId}`"
                  size="small"
                  color="primary"
                  closable
                  @click:close="removeBoardFilter(boardId)"
                  class="active-filter-chip"
                >
                  <v-icon start size="14">mdi-folder</v-icon>
                  {{ boards.find(b => b.id === boardId)?.name }}
                </v-chip>
                <v-chip
                  v-for="memberId in selectedFilterMemberIds"
                  :key="`member-${memberId}`"
                  size="small"
                  color="info"
                  closable
                  @click:close="toggleFilterMember(memberId)"
                  class="active-filter-chip"
                >
                  <v-icon start size="14">mdi-account</v-icon>
                  {{ teamMembers.find(m => m.id === memberId)?.name }}
                </v-chip>
              </div>
            </div>

            <!-- 필터 옵션 -->
            <div class="filter-options-simple">
              <!-- 보드 필터 -->
              <div class="filter-section-simple">
                <div class="filter-section-header-simple">
                  <v-icon color="primary" size="18">mdi-folder</v-icon>
                  <span class="section-title-simple">보드</span>
                </div>
                <div class="filter-options-list">
                  <div
                    v-for="board in boards"
                    :key="board.id"
                    class="filter-option-simple"
                    :class="{ 'selected': selectedBoardFilters.includes(board.id) }"
                    @click="toggleBoardFilter(board.id)"
                  >
                    <div class="option-color-simple" :style="{ backgroundColor: board.color }"></div>
                    <span class="option-label-simple">{{ board.name }}</span>
                  </div>
                </div>
              </div>

              <!-- 담당자 필터 -->
              <div class="filter-section-simple">
                <div class="filter-section-header-simple">
                  <v-icon color="info" size="18">mdi-account-group</v-icon>
                  <span class="section-title-simple">담당자</span>
                </div>
                <div class="filter-options-list">
                  <div
                    v-for="member in teamMembers"
                    :key="member.id"
                    class="filter-option-simple"
                    :class="{ 'selected': selectedFilterMemberIds.includes(member.id) }"
                    @click="toggleFilterMember(member.id)"
                  >
                    <div class="option-avatar-simple" :style="{ backgroundColor: member.color }">
                      <span class="text-white text-caption">{{ member.avatar }}</span>
                    </div>
                    <span class="option-label-simple">{{ member.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 필터 액션 -->
            <div class="filter-actions">
              <v-btn
                variant="outlined"
                size="small"
                @click="clearAllFilters"
                class="clear-filters-btn"
              >
                <v-icon left size="16">mdi-refresh</v-icon>
                초기화
              </v-btn>
              <v-btn
                color="primary"
                size="small"
                @click="showMultiFilter = false"
                class="apply-filters-btn"
              >
                <v-icon left size="16">mdi-check</v-icon>
                적용
              </v-btn>
            </div>
          </div>
        </div>

        <!-- 뷰 모드 전환 -->
        <div class="timeline-view-controls">
          <div class="view-mode-buttons">
            <button 
              class="view-mode-btn"
              :class="{ 'active': timelineViewMode === 'month' }"
              @click="timelineViewMode = 'month'"
            >
              <v-icon>mdi-calendar-month</v-icon>
              월
            </button>
            <button 
              class="view-mode-btn"
              :class="{ 'active': timelineViewMode === 'week' }"
              @click="timelineViewMode = 'week'"
            >
              <v-icon>mdi-calendar-week</v-icon>
              주
            </button>
          </div>
        </div>

        <!-- 타임라인 콘텐츠 -->
        <div class="timeline-content">
          <!-- 타임라인 그리드 -->
          <div class="timeline-grid">
            <!-- 왼쪽 업무 항목 제목 -->
            <div class="timeline-task-column">
              <div class="timeline-task-header">업무</div>
              <div class="timeline-task-list">
                <div
                  v-for="task in filteredTasks"
                  :key="task.id"
                  class="timeline-task-row"
                  @click="viewTaskDetail(task)"
                >
                  <div class="task-title">{{ task.title }}</div>
                  <div 
                    class="task-color-indicator" 
                    :style="{ backgroundColor: boards.find(b => b.id === task.boardId)?.color }"
                  ></div>
                </div>
              </div>
            </div>
            
            <!-- 오른쪽 날짜 컬럼들 -->
            <div class="timeline-date-columns">
              <div 
                v-for="dateInfo in timelineDates" 
                :key="dateInfo.date.toISOString()"
                class="timeline-date-column"
              >
                <div class="timeline-date-header">{{ dateInfo.label }}</div>
                <div class="timeline-date-cells">
                  <div
                    v-for="task in filteredTasks"
                    :key="task.id"
                    class="timeline-date-cell"
                    :class="{ 'has-task': isTaskInDateRange(task, dateInfo.date) }"
                    @click="viewTaskDetail(task)"
                  >
                    <div 
                      v-if="isTaskInDateRange(task, dateInfo.date)"
                      class="task-bar"
                      :style="{ backgroundColor: boards.find(b => b.id === task.boardId)?.color }"
                    ></div>
                  </div>
                </div>
              </div>
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
          
          <!-- 프로필 필터와 오늘 버튼 -->
          <div class="calendar-right-controls">
            <!-- 프로필 필터 -->
            <div class="profile-avatars-container">
              <div
                v-for="(member, index) in visibleMembers"
                :key="member.id"
                class="profile-avatar"
                :class="{ 'active': selectedFilterMemberIds.includes(member.id) }"
                @click="toggleFilterMember(member.id)"
                :style="{ 
                  backgroundColor: member.color,
                  zIndex: visibleMembers.length - index
                }"
              >
                <span class="text-white text-caption">{{ member.avatar }}</span>
              </div>
            </div>
            <!-- 오늘 버튼 -->
            <button class="today-button" @click="goToToday">
              <v-icon>mdi-calendar-today</v-icon>
              오늘
            </button>
          </div>
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

    <!-- 업무 추가 모달 (지라 스타일) -->
    <v-dialog v-model="showAddTaskModal" max-width="800px" @click:outside="showAddTaskModal = false">
      <v-card class="jira-modal">
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <div class="header-content">
            <div class="modal-icon">
              <v-icon color="primary">mdi-calendar-plus</v-icon>
            </div>
            <div class="header-text">
              <h2 class="modal-title">새 업무 추가</h2>
              <p class="modal-subtitle">팀 업무를 생성하세요</p>
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
                  <label class="input-label">업무 제목 *</label>
            <v-text-field
              v-model="newTask.title"
              variant="outlined"
              required
                    placeholder="업무 제목을 입력하세요"
                    class="modern-input title-field"
                    :rules="[v => !!v || '업무 제목은 필수입니다']"
                    hide-details="auto"
            />
                </div>
            
                <div class="input-group">
                  <label class="input-label">업무 내용</label>
            <v-textarea
              v-model="newTask.description"
              variant="outlined"
                    rows="4"
                    placeholder="업무에 대한 상세 내용을 입력하세요"
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
                    <label class="input-label">담당자 *</label>
                    <v-select
                      v-model="newTask.assignee"
                      :items="memberOptions"
                      variant="outlined"
                      placeholder="담당자를 선택하세요"
                      class="modern-select assignee-select"
                      hide-details
                    >
                      <template #item="{ props, item }">
                        <div v-bind="props" class="member-item">
                          <v-avatar size="28" :color="getStatusColor(item.raw.status)" class="member-avatar">
                            <span class="text-white text-caption">{{ item.raw.avatar }}</span>
                          </v-avatar>
                          <div class="member-name">{{ item.raw.name }}</div>
                        </div>
                      </template>
                      <template #selection="{ item }">
                        <div class="d-flex align-center selected-member">
                          <v-avatar size="28" :color="getStatusColor(item.raw.status)" class="selected-avatar">
                            <span class="text-white text-caption">{{ item.raw.avatar }}</span>
                          </v-avatar>
                          <span class="selected-member-name">{{ item.raw.name }}</span>
                        </div>
                      </template>
                    </v-select>
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
              :disabled="!newTask.title || !newTask.boardId || !newTask.assignee"
            >
              <v-icon left>mdi-plus</v-icon>
              업무 생성
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
    <v-dialog v-model="showDayEventsModal" max-width="500px" @click:outside="closeDayEventsModal">
      <v-card class="day-events-modal" v-if="selectedDay">
        <div class="modal-header">
          <h3 class="modal-title">{{ selectedDay.getMonth() + 1 }}월 {{ selectedDay.getDate() }}일</h3>
          <v-btn icon @click="closeDayEventsModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
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

.search-filter-section .calendar-profile-filter {
  margin-left: auto;
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

.boards-container .board-column {
  transition: all 0.3s ease;
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

.drag-handle {
  cursor: grab;
  padding: 4px;
  border-radius: 4px;
  color: rgba(var(--v-theme-on-surface), 0.6);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drag-handle:hover {
  background: rgba(var(--v-theme-on-surface), 0.1);
  color: rgb(var(--v-theme-on-surface));
}

.drag-handle:active {
  cursor: grabbing;
}

.board-right-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.board-actions {
  display: flex;
  align-items: center;
  gap: 8px;
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
  min-width: 600px;
  max-width: 800px;
  width: 70vw;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
}

/* 캘린더 오른쪽 컨트롤 */
.calendar-right-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-avatars-container {
  display: flex;
  align-items: center;
  gap: -6px;
  max-width: 300px;
  overflow: hidden;
}

.profile-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: -6px;
  border: 2px solid white;
  position: relative;
  flex-shrink: 0;
}

.profile-avatar:first-child {
  margin-left: 0;
}

.profile-avatar:hover {
  transform: translateY(-2px) scale(1.1);
  z-index: 10;
}

.profile-avatar.active {
  border-color: #1976d2;
  transform: scale(1.1);
  z-index: 10;
}


/* 다크모드 - 캘린더 프로필 필터 */
.dark .profile-avatar {
  border-color: #2d3748;
}

.dark .profile-avatar.active {
  border-color: #3182ce;
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
  flex-shrink: 0;
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
  border-radius: 12px;
  overflow: hidden;
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

.assignee-select {
  width: 100%;
}

.assignee-chip {
  margin-left: 8px;
}

/* 멤버 선택 드롭다운 스타일 */
.member-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  min-height: 70px;
  border-radius: 8px;
  margin: 4px 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.member-item:hover {
  background-color: rgba(25, 118, 210, 0.08) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.member-avatar {
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  margin-right: 12px;
}

.member-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.member-name {
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #1a1a1a !important;
  margin-bottom: 0 !important;
  letter-spacing: -0.02em;
}

/* 선택된 멤버 표시 스타일 */
.selected-member {
  padding: 6px 0;
  gap: 12px;
}

.selected-avatar {
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.selected-member-name {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 32px;
  background: #f4f5f7;
  border-top: 1px solid #e1e5e9;
  min-height: 64px;
  gap: 12px;
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

/* 다크모드 - 멤버 선택 */
.dark-mode .member-item:hover {
  background-color: rgba(25, 118, 210, 0.15) !important;
}

.dark-mode .member-name {
  color: #fff !important;
}

.dark-mode .selected-member-name {
  color: #fff;
}

.dark-mode .member-avatar {
  border-color: rgba(255, 255, 255, 0.2);
}

.dark-mode .selected-avatar {
  border-color: rgba(255, 255, 255, 0.2);
}


/* 다크모드 - 좌우 스크롤 필터 */
.dark-mode .filter-section-header {
  color: #ccc;
}

.dark-mode .filter-horizontal-option {
  background: #2a2a2a;
  border-color: #404040;
  color: #fff;
}

.dark-mode .filter-horizontal-option:hover {
  background: #1e3a5f;
  border-color: #1976d2;
}

.dark-mode .filter-horizontal-option.selected {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.dark-mode .filter-horizontal-scroll::-webkit-scrollbar-thumb {
  background: #555;
}

.dark-mode .filter-horizontal-scroll::-webkit-scrollbar-thumb:hover {
  background: #777;
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

.option-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 간단한 필터 스타일 */
.filter-options-simple {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  padding: 20px 30px;
}

.filter-section-simple {
  flex: 1;
  min-width: 0;
}

.filter-section-header-simple {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #e1e5e9;
}

.section-title-simple {
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.filter-options-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.filter-option-simple {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.filter-option-simple:hover {
  background: #e3f2fd;
  border-color: #2196f3;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(33, 150, 243, 0.15);
}

.filter-option-simple.selected {
  background: #e3f2fd;
  border-color: #1976d2;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.2);
}

.option-color-simple {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.option-avatar-simple {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}

.option-label-simple {
  font-size: 12px;
  font-weight: 500;
  color: #172b4d;
  white-space: nowrap;
}

/* 2x2 그리드 필터 스타일 */
.filter-options-grid-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 30px;
  padding: 30px 40px;
  height: 400px;
}

/* 큰 필터 스타일 */
.filter-options-large {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  padding: 30px 40px;
}

.filter-section-large {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filter-section-header-large {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 3px solid #e1e5e9;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #172b4d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-options-grid {
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
  flex: 1;
  align-items: flex-start;
}

.filter-options-grid::-webkit-scrollbar {
  height: 6px;
}

.filter-options-grid::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.filter-options-grid::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.filter-options-grid::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.filter-option-large {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.filter-option-large:hover {
  background: #e3f2fd;
  border-color: #2196f3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.15);
}

.filter-option-large.selected {
  background: #e3f2fd;
  border-color: #1976d2;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2);
}

.option-color-large {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.option-avatar-large {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

.option-label-large {
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
  white-space: nowrap;
}

/* 다크모드 - 간단한 필터 */
.dark .filter-section-header-simple {
  border-bottom-color: #2d3748;
}

.dark .section-title-simple {
  color: #e2e8f0;
}

.dark .filter-option-simple {
  background: #2d3748;
  border-color: transparent;
}

.dark .filter-option-simple:hover {
  background: #4a5568;
  border-color: #3182ce;
}

.dark .filter-option-simple.selected {
  background: #2b6cb0;
  border-color: #3182ce;
}

.dark .option-label-simple {
  color: #e2e8f0;
}

/* 다크모드 - 큰 필터 */
.dark .filter-section-header-large {
  border-bottom-color: #2d3748;
}

.dark .section-title {
  color: #e2e8f0;
}

.dark .filter-option-large {
  background: #2d3748;
  border-color: transparent;
}

.dark .filter-option-large:hover {
  background: #4a5568;
  border-color: #3182ce;
}

.dark .filter-option-large.selected {
  background: #2b6cb0;
  border-color: #3182ce;
}

.dark .option-label-large {
  color: #e2e8f0;
}

/* 반응형 디자인 - 간단한 필터 */
@media (max-width: 768px) {
  .filter-options-simple {
    flex-direction: column;
    gap: 20px;
    padding: 15px 20px;
  }
  
  .filter-section-simple {
    flex: none;
  }
  
  .filter-options-list {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  
  .filter-option-simple {
    padding: 6px 10px;
  }
  
  /* 캘린더 오른쪽 컨트롤 반응형 */
  .calendar-right-controls {
    flex-direction: column;
    gap: 8px;
  }
  
  .profile-avatars-container {
    max-width: 100%;
    justify-content: center;
  }
  
  .profile-avatar {
    width: 28px;
    height: 28px;
    margin-left: -4px;
  }
}

/* 반응형 디자인 - 2x2 그리드 필터 */
@media (max-width: 768px) {
  .filter-options-grid-2x2 {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    height: auto;
    gap: 20px;
  }
  
  .filter-options-large {
    flex-direction: column;
    gap: 20px;
  }
  
  .filter-section-large {
    flex: none;
  }
  
  .filter-options-grid {
    gap: 8px;
  }
  
  .filter-option-large {
    min-width: 120px;
    padding: 12px 16px;
  }
}

.filter-section-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #666;
}

.filter-horizontal-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}

.filter-horizontal-scroll::-webkit-scrollbar {
  height: 4px;
}

.filter-horizontal-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.filter-horizontal-scroll::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 2px;
}

.filter-horizontal-scroll::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}

.filter-horizontal-option {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
}

.filter-horizontal-option:hover {
  background: #e8f4fd;
  border-color: #1976d2;
}

.filter-horizontal-option.selected {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.filter-horizontal-option .option-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}

.filter-horizontal-option .option-avatar {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.filter-horizontal-option .option-label {
  font-size: 12px;
  font-weight: 500;
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