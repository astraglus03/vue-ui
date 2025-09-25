<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentChannel: String
})

// 팀 통계 데이터
const teamStats = ref([
  {
    title: '채널 개수',
    value: 5,
    description: '활성 채널',
    icon: 'mdi-folder',
    color: 'primary'
  },
  {
    title: '진행중인 업무',
    value: 12,
    description: '할 일 보드',
    icon: 'mdi-clipboard-check',
    color: 'warning'
  },
  {
    title: '완료된 업무',
    value: 8,
    description: '완료 보드',
    icon: 'mdi-check-circle',
    color: 'success'
  },
  {
    title: '팀 멤버',
    value: 6,
    description: '활성 멤버',
    icon: 'mdi-account-group',
    color: 'info'
  }
])

// 최근 활동 (무한스크롤용)
const recentActivities = ref([
  {
    id: 1,
    user: '김민수',
    action: '프로젝트 기획서.pdf 파일을 업로드했습니다',
    time: '5분 전',
    avatar: '김'
  },
  {
    id: 2,
    user: '이지현',
    action: '마케팅 채널에 메시지를 보냈습니다',
    time: '12분 전',
    avatar: '이'
  },
  {
    id: 3,
    user: '박준영',
    action: '새로운 일정을 추가했습니다: "클라이언트 미팅"',
    time: '1시간 전',
    avatar: '박'
  },
  {
    id: 4,
    user: '최수진',
    action: '화상회의 "주간 스탠드업"을 시작했습니다',
    time: '2시간 전',
    avatar: '최'
  },
  {
    id: 5,
    user: '정현우',
    action: '코드 리뷰를 완료했습니다',
    time: '3시간 전',
    avatar: '정'
  },
  {
    id: 6,
    user: '한소영',
    action: '디자인 시안을 업로드했습니다',
    time: '4시간 전',
    avatar: '한'
  },
  {
    id: 7,
    user: '윤동현',
    action: '데이터 분석 보고서를 공유했습니다',
    time: '5시간 전',
    avatar: '윤'
  },
  {
    id: 8,
    user: '강민지',
    action: '고객 피드백을 정리했습니다',
    time: '6시간 전',
    avatar: '강'
  },
  {
    id: 9,
    user: '오승민',
    action: '시스템 점검을 완료했습니다',
    time: '7시간 전',
    avatar: '오'
  },
  {
    id: 10,
    user: '임지연',
    action: '마케팅 계획을 업데이트했습니다',
    time: '8시간 전',
    avatar: '임'
  },
  {
    id: 11,
    user: '신태원',
    action: '새 프로젝트 제안서를 작성했습니다',
    time: '9시간 전',
    avatar: '신'
  },
  {
    id: 12,
    user: '권혜림',
    action: '예산안을 검토했습니다',
    time: '10시간 전',
    avatar: '권'
  },
  {
    id: 13,
    user: '류종호',
    action: '보고서 초안을 완성했습니다',
    time: '11시간 전',
    avatar: '류'
  },
  {
    id: 14,
    user: '송지원',
    action: '팀 미팅 일정을 조율했습니다',
    time: '12시간 전',
    avatar: '송'
  },
  {
    id: 15,
    user: '장명수',
    action: '기술 문서를 업데이트했습니다',
    time: '1일 전',
    avatar: '장'
  },
  {
    id: 16,
    user: '김연주',
    action: '고객 상담 일정을 잡았습니다',
    time: '1일 전',
    avatar: '김'
  },
  {
    id: 17,
    user: '이현석',
    action: '품질 검사 결과를 보고했습니다',
    time: '1일 전',
    avatar: '이'
  },
  {
    id: 18,
    user: '박선희',
    action: '교육 자료 준비를 완료했습니다',
    time: '2일 전',
    avatar: '박'
  },
  {
    id: 19,
    user: '최지훈',
    action: '네트워크 보안 점검을 완료했습니다',
    time: '2일 전',
    avatar: '최'
  },
  {
    id: 20,
    user: '정소희',
    action: '인사팀과 급여 관련 논의를 했습니다',
    time: '3일 전',
    avatar: '정'
  }
])

// 무한스크롤 관련
const isLoading = ref(false)
const hasMore = ref(true)
const page = ref(1)
const itemsPerPage = 10

// 더 많은 활동 로드
const loadMoreActivities = async () => {
  if (isLoading.value || !hasMore.value) return
  
  isLoading.value = true
  
  // 실제로는 API 호출
  setTimeout(() => {
    const newActivities = [
      {
        id: recentActivities.value.length + 1,
        user: '신태원',
        action: '새 프로젝트 제안서를 작성했습니다',
        time: '9시간 전',
        avatar: '신'
      },
      {
        id: recentActivities.value.length + 2,
        user: '권혜림',
        action: '예산안을 검토했습니다',
        time: '10시간 전',
        avatar: '권'
      }
    ]
    
    recentActivities.value.push(...newActivities)
    page.value++
    
    // 더 이상 데이터가 없으면 hasMore를 false로 설정
    if (page.value >= 3) {
      hasMore.value = false
    }
    
    isLoading.value = false
  }, 1000)
}

// 스크롤 핸들러
const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target
  const threshold = 50 // 스크롤이 하단에서 50px 이내에 있을 때 로드
  
  if (scrollHeight - scrollTop <= clientHeight + threshold) {
    loadMoreActivities()
  }
}

// 다가오는 일정
const upcomingSchedules = ref([
  {
    id: 1,
    title: '클라이언트 프레젠테이션',
    time: '오늘 오후 2:00',
    type: 'meeting'
  },
  {
    id: 2,
    title: '팀 회식',
    time: '내일 오후 6:30',
    type: 'event'
  },
  {
    id: 3,
    title: '월간 보고서 제출',
    time: '9월 30일 오후 5:00',
    type: 'deadline'
  },
  {
    id: 4,
    title: '주간 스탠드업 미팅',
    time: '내일 오전 9:00',
    type: 'meeting'
  },
  {
    id: 5,
    title: '프로젝트 리뷰',
    time: '내일 오후 3:00',
    type: 'meeting'
  },
  {
    id: 6,
    title: '디자인 시안 검토',
    time: '수요일 오전 10:00',
    type: 'meeting'
  },
  {
    id: 7,
    title: '코드 리뷰 세션',
    time: '수요일 오후 2:00',
    type: 'meeting'
  },
  {
    id: 8,
    title: '고객 피드백 수집',
    time: '목요일 오전 11:00',
    type: 'deadline'
  },
  {
    id: 9,
    title: '마케팅 캠페인 기획',
    time: '목요일 오후 4:00',
    type: 'meeting'
  },
  {
    id: 10,
    title: '시스템 점검',
    time: '금요일 오전 8:00',
    type: 'event'
  },
  {
    id: 11,
    title: '분기 보고서 작성',
    time: '금요일 오후 5:00',
    type: 'deadline'
  },
  {
    id: 12,
    title: '팀 워크샵',
    time: '다음 주 월요일 오전 9:00',
    type: 'event'
  },
  {
    id: 13,
    title: '신제품 발표회',
    time: '다음 주 화요일 오후 2:00',
    type: 'meeting'
  }
])

// 최근 문서
const recentDocuments = ref([
  {
    id: 1,
    name: '프로젝트 기획서.pdf',
    uploader: '김민수',
    time: '5분 전',
    type: 'pdf'
  },
  {
    id: 2,
    name: '마케팅 전략.docx',
    uploader: '이지현',
    time: '1시간 전',
    type: 'docx'
  },
  {
    id: 3,
    name: 'UI 디자인 가이드.psd',
    uploader: '최수진',
    time: '3시간 전',
    type: 'psd'
  },
  {
    id: 4,
    name: '데이터 분석 보고서.xlsx',
    uploader: '정현우',
    time: '5시간 전',
    type: 'xlsx'
  },
  {
    id: 5,
    name: '회의록_2024_09_15.pdf',
    uploader: '장서연',
    time: '1일 전',
    type: 'pdf'
  },
  {
    id: 6,
    name: '사용자 피드백 수집.xlsx',
    uploader: '한소영',
    time: '2일 전',
    type: 'xlsx'
  },
  {
    id: 7,
    name: '기술 명세서.docx',
    uploader: '윤동현',
    time: '2일 전',
    type: 'docx'
  },
  {
    id: 8,
    name: '프로토타입_데모.mp4',
    uploader: '강민지',
    time: '3일 전',
    type: 'mp4'
  },
  {
    id: 9,
    name: '예산 계획서.pdf',
    uploader: '오승민',
    time: '3일 전',
    type: 'pdf'
  },
  {
    id: 10,
    name: '고객 요구사항 정리.docx',
    uploader: '임지연',
    time: '4일 전',
    type: 'docx'
  },
  {
    id: 11,
    name: '시스템 아키텍처 다이어그램.png',
    uploader: '신태원',
    time: '4일 전',
    type: 'png'
  },
  {
    id: 12,
    name: '테스트 케이스.xlsx',
    uploader: '권혜림',
    time: '5일 전',
    type: 'xlsx'
  },
  {
    id: 13,
    name: '프레젠테이션_최종.pptx',
    uploader: '류종호',
    time: '5일 전',
    type: 'pptx'
  },
  {
    id: 14,
    name: '코드 리뷰 체크리스트.pdf',
    uploader: '송지원',
    time: '1주일 전',
    type: 'pdf'
  },
  {
    id: 15,
    name: '배포 가이드.docx',
    uploader: '장명수',
    time: '1주일 전',
    type: 'docx'
  }
])

// 활성화된 화상회의
const activeMeetings = ref([
  {
    id: 1,
    title: '주간 스탠드업 미팅',
    participants: 3,
    duration: '12분',
    isActive: true
  },
  {
    id: 2,
    title: '프로젝트 리뷰 회의',
    participants: 5,
    duration: '25분',
    isActive: true
  },
  {
    id: 3,
    title: '클라이언트 미팅',
    participants: 2,
    duration: '8분',
    isActive: true
  },
  {
    id: 4,
    title: '디자인 리뷰 세션',
    participants: 4,
    duration: '15분',
    isActive: true
  },
  {
    id: 5,
    title: '코드 리뷰 미팅',
    participants: 3,
    duration: '20분',
    isActive: true
  },
  {
    id: 6,
    title: '마케팅 브레인스토밍',
    participants: 6,
    duration: '30분',
    isActive: true
  },
  {
    id: 7,
    title: '고객 피드백 검토',
    participants: 2,
    duration: '10분',
    isActive: true
  },
  {
    id: 8,
    title: '기술 세미나',
    participants: 8,
    duration: '45분',
    isActive: true
  },
  {
    id: 9,
    title: '프로젝트 기획 회의',
    participants: 5,
    duration: '35분',
    isActive: true
  },
  {
    id: 10,
    title: '품질 관리 미팅',
    participants: 3,
    duration: '18분',
    isActive: true
  },
  {
    id: 11,
    title: '사용자 테스트 리뷰',
    participants: 4,
    duration: '22분',
    isActive: true
  },
  {
    id: 12,
    title: '시스템 점검 회의',
    participants: 2,
    duration: '12분',
    isActive: true
  },
  {
    id: 13,
    title: '팀 워크샵 준비',
    participants: 7,
    duration: '40분',
    isActive: true
  }
])


// 화상회의 참여
const joinMeeting = () => {
  console.log('화상회의 참여')
}

</script>

<template>
  <div class="team-dashboard">
    <!-- 헤더 -->
    <div class="dashboard-header">
      <h1 class="page-title">팀 대시보드</h1>
      <p class="page-subtitle">스타트업 팀의 활동과 현황을 한눈에 확인하세요</p>
    </div>

    <!-- 통계 카드들 -->
    <div class="stats-grid">
      <v-card
        v-for="stat in teamStats"
        :key="stat.title"
        class="stat-card"
        elevation="2"
      >
        <div class="stat-header">
          <span class="stat-title">{{ stat.title }}</span>
          <v-icon :color="stat.color" size="18">{{ stat.icon }}</v-icon>
        </div>
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-description">{{ stat.description }}</div>
      </v-card>
    </div>

    <!-- 하단 섹션 -->
    <div class="bottom-section">
      <!-- 왼쪽 컬럼 -->
      <div class="left-column">
        <!-- 최근 활동 -->
        <v-card class="activity-card" elevation="2">
          <v-card-title class="activity-header">
            <v-icon class="activity-icon">mdi-lightning-bolt</v-icon>
            <span>최근 활동</span>
          </v-card-title>
          
          <v-card-text class="activity-content" style="padding: 0; flex: 1; display: flex; flex-direction: column;">
            <div 
              class="activity-list scrollable-list"
              @scroll="handleScroll"
              ref="activityList"
            >
              <div
                v-for="activity in recentActivities"
                :key="activity.id"
                class="activity-item"
              >
                <v-avatar size="28" color="primary">
                  {{ activity.avatar }}
                </v-avatar>
                <div class="activity-info">
                  <div class="activity-text">
                    <strong>{{ activity.user }}</strong>님이 {{ activity.action }}
                  </div>
                  <div class="activity-time">{{ activity.time }}</div>
                </div>
              </div>
              
              <!-- 로딩 인디케이터 -->
              <div v-if="isLoading" class="loading-indicator">
                <v-progress-circular indeterminate size="24" color="primary" />
                <span>로딩 중...</span>
              </div>
              
              <!-- 더 이상 데이터가 없을 때 -->
              <div v-if="!hasMore && !isLoading" class="no-more-data">
                모든 활동을 불러왔습니다
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- 다가오는 일정 -->
        <v-card class="schedule-card" elevation="2">
          <v-card-title class="schedule-header">
            <v-icon class="schedule-icon">mdi-calendar-clock</v-icon>
            <span>다가오는 일정</span>
            <v-spacer />
            <v-btn size="small" variant="text" color="primary">일정 보기</v-btn>
          </v-card-title>
          
          <v-card-text style="padding: 0; flex: 1; display: flex; flex-direction: column;">
            <div class="schedule-list scrollable-list">
              <div
                v-for="schedule in upcomingSchedules"
                :key="schedule.id"
                class="schedule-item"
              >
                <div class="schedule-title">{{ schedule.title }}</div>
                <div class="schedule-time">
                  <v-icon size="12">mdi-clock</v-icon>
                  {{ schedule.time }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- 오른쪽 컬럼 -->
      <div class="right-column">
        <!-- 최근 문서 -->
        <v-card class="documents-card" elevation="2">
          <v-card-title class="documents-header">
            <v-icon class="documents-icon">mdi-file-document</v-icon>
            <span>최근 문서</span>
            <v-spacer />
            <v-btn size="small" variant="text" color="primary">드라이브 열기</v-btn>
          </v-card-title>
          
          <v-card-text style="padding: 0; flex: 1; display: flex; flex-direction: column;">
            <div class="documents-list scrollable-list">
            <div
              v-for="doc in recentDocuments"
              :key="doc.id"
              class="document-item"
            >
                <div class="document-icon">
                  <v-icon>{{ 
                    doc.type === 'pdf' ? 'mdi-file-pdf' : 
                    doc.type === 'docx' ? 'mdi-file-word' : 
                    doc.type === 'xlsx' ? 'mdi-file-excel' : 
                    'mdi-file-image' 
                  }}</v-icon>
                </div>
                <div class="document-info">
                  <div class="document-name">{{ doc.name }}</div>
                  <div class="document-meta">{{ doc.uploader }} • {{ doc.time }}</div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- 활성화된 화상회의 -->
        <v-card class="meeting-card" elevation="2">
          <v-card-title class="meeting-header">
            <v-icon class="meeting-icon">mdi-video</v-icon>
            <span>진행중인 회의</span>
          </v-card-title>
          
          <v-card-text style="padding: 0; flex: 1; display: flex; flex-direction: column;">
            <div class="meeting-list scrollable-list">
              <div
                v-for="meeting in activeMeetings"
                :key="meeting.id"
                class="meeting-item"
              >
                <div class="meeting-status"></div>
                <div class="meeting-info">
                  <div class="meeting-title">{{ meeting.title }}</div>
                  <div class="meeting-details">{{ meeting.participants }}명 참여중 • {{ meeting.duration }} 진행</div>
                </div>
                <v-btn
                  color="success"
                  size="small"
                  @click="joinMeeting"
                >
                  참여
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-dashboard {
  padding: 16px;
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, rgb(var(--v-theme-background)) 0%, rgb(var(--v-theme-surface)) 100%);
}

.dashboard-header {
  margin-bottom: 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  color: rgb(var(--v-theme-on-background));
}

.page-subtitle {
  color: rgb(var(--v-theme-on-surface));
  font-size: 13px;
  opacity: 0.7;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 16px;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.stat-title {
  color: rgb(var(--v-theme-on-surface));
  font-size: 12px;
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
  grid-template-columns: 5fr 3fr;
  gap: 16px;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-card,
.schedule-card,
.meeting-card,
.documents-card {
  border-radius: 10px;
  margin-bottom: 0;
  max-height: 320px;
  display: flex;
  flex-direction: column;
}

.activity-card,
.documents-card {
  height: 250px;
}

.schedule-card,
.meeting-card {
  height: 250px;
}

/* 스크롤 가능한 리스트 */
.scrollable-list {
  max-height: 200px;
  overflow-y: auto;
  padding: 8px 0;
}

.scrollable-list::-webkit-scrollbar {
  width: 4px;
}

.scrollable-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.scrollable-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.scrollable-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* 로딩 인디케이터 */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  color: rgb(var(--v-theme-primary));
  font-size: 14px;
}

.no-more-data {
  text-align: center;
  padding: 16px;
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: 14px;
  font-style: italic;
}

.activity-header,
.schedule-header,
.meeting-header,
.documents-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px 8px 16px;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.activity-icon,
.schedule-icon,
.meeting-icon,
.documents-icon {
  color: rgb(var(--v-theme-primary));
  font-size: 16px;
}

.activity-list,
.schedule-list,
.meeting-list,
.documents-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  flex: 1;
  padding: 0 16px 16px 16px;
}

/* 스크롤바 스타일링 */
.activity-list::-webkit-scrollbar,
.schedule-list::-webkit-scrollbar,
.meeting-list::-webkit-scrollbar,
.documents-list::-webkit-scrollbar {
  width: 4px;
}

.activity-list::-webkit-scrollbar-track,
.schedule-list::-webkit-scrollbar-track,
.meeting-list::-webkit-scrollbar-track,
.documents-list::-webkit-scrollbar-track {
  background: transparent;
}

.activity-list::-webkit-scrollbar-thumb,
.schedule-list::-webkit-scrollbar-thumb,
.meeting-list::-webkit-scrollbar-thumb,
.documents-list::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.3);
  border-radius: 2px;
}

.activity-list::-webkit-scrollbar-thumb:hover,
.schedule-list::-webkit-scrollbar-thumb:hover,
.meeting-list::-webkit-scrollbar-thumb:hover,
.documents-list::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.5);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: rgba(var(--v-theme-primary), 0.05);
  border-radius: 6px;
}

.activity-info {
  flex: 1;
}

.activity-text {
  font-size: 12px;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 2px;
  line-height: 1.3;
}

.activity-time {
  font-size: 10px;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
}

.schedule-item {
  padding: 8px;
  background: rgba(var(--v-theme-primary), 0.05);
  border-radius: 6px;
  border-left: 3px solid rgb(var(--v-theme-primary));
}

.schedule-title {
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 3px;
  line-height: 1.3;
}

.schedule-time {
  font-size: 10px;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 3px;
}


.meeting-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: rgba(var(--v-theme-success), 0.1);
  border: 1px solid rgba(var(--v-theme-success), 0.2);
  border-radius: 6px;
}

.meeting-status {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(var(--v-theme-success));
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.meeting-info {
  flex: 1;
}

.meeting-title {
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 2px;
  line-height: 1.3;
}

.meeting-details {
  font-size: 10px;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.document-item:hover {
  background: rgba(var(--v-theme-primary), 0.05);
}

.document-icon {
  width: 24px;
  height: 24px;
  background: rgba(var(--v-theme-primary), 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--v-theme-primary));
  font-size: 12px;
}

.document-info {
  flex: 1;
}

.document-name {
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 2px;
  line-height: 1.3;
}

.document-meta {
  font-size: 10px;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .team-dashboard {
    padding: 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .bottom-section {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 24px;
  }
}
</style>
