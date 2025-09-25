<template>
  <div class="team-meeting">
    <!-- 헤더 -->
    <div class="meeting-header">
      <div class="header-left">
        <h2 class="meeting-title">{{ currentChannelData.title }}</h2>
        <!-- 미팅 참여 상태 표시 -->
        <div v-if="isCurrentlyInMeeting" class="meeting-status-badge">
          <v-icon size="16" color="success">mdi-video</v-icon>
          <span>미팅 참여 중</span>
        </div>
      </div>
      <div class="header-right">
        <v-btn
          v-if="!currentMeetingRoom?.isActive && isGeneralMeeting"
          color="primary"
          prepend-icon="mdi-video-plus"
          :disabled="!canJoinMeeting"
          @click="startMeeting"
        >
          {{ isCurrentlyInMeeting ? '미팅 참여 중' : '회의 시작하기' }}
        </v-btn>
        <v-btn
          v-else-if="!currentMeetingRoom?.isActive && !isGeneralMeeting"
          color="success"
          prepend-icon="mdi-video"
          :disabled="!canJoinMeeting"
          @click="joinExistingMeeting"
        >
          {{ isCurrentlyInMeeting ? '미팅 참여 중' : '회의 참여하기' }}
        </v-btn>
        <v-btn
          v-else
          color="success"
          prepend-icon="mdi-video"
          :disabled="!canJoinMeeting"
          @click="joinMeeting"
        >
          {{ isCurrentlyInMeeting ? '미팅 참여 중' : '회의 참여하기' }}
        </v-btn>
      </div>
    </div>

    <!-- 회의 시작/참여 영역 -->
    <div v-if="currentMeetingRoom?.isActive" class="active-meeting-section">
      <div class="meeting-status-card">
        <div class="status-content">
          <v-icon class="status-icon" color="success">mdi-video</v-icon>
          <div class="status-info">
            <h3>회의가 진행 중입니다</h3>
            <p>{{ currentMeetingRoom.participants }}명이 참여 중</p>
          </div>
        </div>
        <div class="meeting-actions">
          <v-btn
            v-if="!isCurrentlyInMeeting"
            color="primary"
            prepend-icon="mdi-video"
            @click="joinMeeting"
          >
            참여하기
          </v-btn>
          <v-btn
            v-else
            color="success"
            prepend-icon="mdi-video"
            disabled
          >
            미팅 참여 중
          </v-btn>
          <v-btn
            v-if="isHost"
            color="error"
            prepend-icon="mdi-phone-hangup"
            @click="endMeetingAsHost"
          >
            회의 종료
          </v-btn>
        </div>
      </div>
    </div>

    <!-- 프로젝트 회의실용 기존 회의 안내 -->
    <div v-else-if="!isGeneralMeeting && !currentMeetingRoom?.isActive" class="existing-meeting-section">
      <div class="meeting-info-card">
        <div class="info-content">
          <v-icon class="info-icon" color="primary">mdi-video-outline</v-icon>
          <div class="info-text">
            <h3>진행 중인 회의가 있습니다</h3>
            <p>프로젝트 진행 상황 논의 회의에 참여하세요</p>
          </div>
        </div>
        <div class="meeting-details">
          <div class="detail-item">
            <v-icon size="16" color="grey">mdi-account-group</v-icon>
            <span>3명 참여 중</span>
          </div>
          <div class="detail-item">
            <v-icon size="16" color="grey">mdi-clock-outline</v-icon>
            <span>15분 경과</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 회의 요약 목록 -->
    <div class="meeting-summary-section">
      <div class="section-header">
        <h3 class="section-title">회의 기록</h3>
        <v-btn
          icon="mdi-refresh"
          variant="text"
          size="small"
          class="refresh-btn"
          @click="refreshMeetings"
        />
      </div>
      
      <div class="meeting-timeline" @scroll="handleScroll">
        <div
          v-for="(meeting, index) in meetingHistory"
          :key="meeting.id"
          class="timeline-item"
          :class="{ 'is-active': meeting.isActive }"
          @dblclick="openMeetingDetail(meeting)"
        >
          <div class="timeline-dot">
            <v-icon v-if="meeting.isActive" color="success" size="16">mdi-video</v-icon>
            <div v-else class="dot-inner"></div>
          </div>
          
          <div class="timeline-content">
            <div class="meeting-header-info">
              <h4 class="meeting-title">{{ meeting.title }}</h4>
              <div class="meeting-actions">
                <v-btn
                  icon="mdi-eye-outline"
                  variant="text"
                  size="small"
                  class="action-btn"
                  @click.stop="openMeetingDetail(meeting)"
                />
                <v-btn
                  icon="mdi-download-outline"
                  variant="text"
                  size="small"
                  class="action-btn"
                  @click.stop="downloadMeeting(meeting)"
                />
              </div>
            </div>
            
            <div class="meeting-meta-grid">
              <div class="meta-item">
                <v-icon size="14" color="grey">mdi-calendar</v-icon>
                <span>{{ meeting.date }}</span>
              </div>
              <div class="meta-item">
                <v-icon size="14" color="grey">mdi-clock-outline</v-icon>
                <span>{{ meeting.duration }}</span>
              </div>
              <div class="meta-item">
                <v-icon size="14" color="grey">mdi-account-group</v-icon>
                <span>{{ meeting.participants }}명</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 로딩 인디케이터 -->
        <div v-if="isLoading" class="loading-indicator">
          <v-progress-circular
            indeterminate
            color="primary"
            size="24"
          />
          <span>더 많은 회의를 불러오는 중...</span>
        </div>
        
        <!-- 더 이상 데이터가 없을 때 -->
        <div v-else-if="!hasMoreMeetings && meetingHistory.length > 0" class="no-more-data">
          <v-icon color="grey">mdi-check-circle-outline</v-icon>
          <span>모든 회의 기록을 불러왔습니다</span>
        </div>
      </div>
    </div>

    <!-- 회의 시작 모달 -->
    <v-dialog v-model="showStartMeetingModal" max-width="500">
      <v-card class="start-meeting-modal">
        <div class="modal-header">
          <div class="header-content">
            <v-icon class="header-icon">mdi-video-plus</v-icon>
            <h3 class="modal-title">새 회의 시작하기</h3>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="closeStartMeetingModal"
          />
        </div>
        
        <div class="modal-body">
          <div class="input-group">
            <label class="input-label">회의에 참여할 사람 선택</label>
            <div class="members-selection">
              <div
                v-for="member in teamMembers"
                :key="member.id"
                class="member-item"
                :class="{ 'selected': selectedMembers.includes(member.id) }"
                @click="toggleMemberSelection(member.id)"
              >
                <v-avatar size="32" :color="getStatusColor(member.status)">
                  {{ member.avatar }}
                </v-avatar>
                <div class="member-info">
                  <div class="member-name">{{ member.name }}</div>
                  <div class="member-status">{{ getStatusText(member.status) }}</div>
                </div>
                <v-icon 
                  v-if="selectedMembers.includes(member.id)"
                  class="check-icon"
                  color="primary"
                >
                  mdi-check-circle
                </v-icon>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          <v-btn
            variant="text"
            @click="closeStartMeetingModal"
          >
            취소
          </v-btn>
          <v-btn
            color="primary"
            @click="confirmStartMeeting"
          >
            회의 시작하기
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- 회의 상세 모달 -->
    <v-dialog v-model="showMeetingDetailModal" max-width="800">
      <v-card class="meeting-detail-modal">
        <div class="modal-header">
          <div class="header-content">
            <v-icon class="header-icon">mdi-calendar-clock</v-icon>
            <h3 class="modal-title">{{ selectedMeeting?.title }}</h3>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="closeMeetingDetailModal"
          />
        </div>
        
        <div class="meeting-detail-content">
          <!-- 회의 정보 -->
          <div class="meeting-info-section">
            <h4 class="section-title">회의 정보</h4>
            <div class="info-grid">
              <div class="info-item">
                <v-icon class="info-icon">mdi-calendar</v-icon>
                <div class="info-content">
                  <div class="info-label">일정</div>
                  <div class="info-value">{{ selectedMeeting?.date }}</div>
                </div>
              </div>
              <div class="info-item">
                <v-icon class="info-icon">mdi-clock</v-icon>
                <div class="info-content">
                  <div class="info-label">소요시간</div>
                  <div class="info-value">{{ selectedMeeting?.duration }}</div>
                </div>
              </div>
              <div class="info-item">
                <v-icon class="info-icon">mdi-account-group</v-icon>
                <div class="info-content">
                  <div class="info-label">참여자</div>
                  <div class="info-value">{{ selectedMeeting?.participants }}명</div>
                </div>
              </div>
              <div class="info-item">
                <v-icon class="info-icon">mdi-video</v-icon>
                <div class="info-content">
                  <div class="info-label">상태</div>
                  <div class="info-value" :class="{ 'active': selectedMeeting?.isActive }">
                    {{ selectedMeeting?.isActive ? '진행 중' : '종료됨' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 참여자 목록 -->
          <div class="participants-section">
            <h4 class="section-title">참여자 목록</h4>
            <div class="participants-grid">
              <div
                v-for="participant in selectedMeeting?.participantsList || []"
                :key="participant.id"
                class="participant-card"
              >
                <v-avatar size="40" :color="getStatusColor(participant.status)">
                  {{ participant.avatar }}
                </v-avatar>
                <div class="participant-info">
                  <div class="participant-name">{{ participant.name }}</div>
                  <div class="participant-status">{{ getStatusText(participant.status) }}</div>
                </div>
                <v-icon
                  v-if="participant.isHost"
                  class="host-icon"
                  color="warning"
                >
                  mdi-crown
                </v-icon>
              </div>
            </div>
          </div>

          <!-- 회의 요약 -->
          <div class="meeting-summary-section">
            <h4 class="section-title">회의 요약</h4>
            <div class="summary-content">
              <p>{{ selectedMeeting?.summary || '회의 요약이 없습니다.' }}</p>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          <v-btn
            variant="text"
            @click="closeMeetingDetailModal"
          >
            닫기
          </v-btn>
          <v-btn
            color="primary"
            prepend-icon="mdi-download"
            @click="downloadMeeting(selectedMeeting)"
          >
            회의록 다운로드
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- WebRTC 화상회의 모달 -->
    <v-dialog v-model="showVideoCall" max-width="1200" fullscreen>
      <v-card class="video-call-modal">
        <!-- 화상회의 헤더 -->
        <div class="video-call-header">
          <div class="call-info">
            <h3 class="call-title">{{ currentMeeting?.title }}</h3>
            <p class="call-duration">{{ callDuration }}</p>
          </div>
          <div class="call-controls">
            <v-btn
              icon="mdi-microphone"
              :color="isMuted ? 'error' : 'success'"
              @click="toggleMute"
            />
            <v-btn
              icon="mdi-video"
              :color="isVideoOn ? 'success' : 'error'"
              @click="toggleVideo"
            />
            <v-btn
              icon="mdi-monitor"
              :color="isScreenSharing ? 'primary' : 'white'"
              :class="{ 'screen-share-btn': !isScreenSharing }"
              @click="toggleScreenShare"
            />
            <v-btn
              icon="mdi-phone-hangup"
              color="error"
              @click="endCall"
            />
          </div>
        </div>

        <!-- 메인 컨테이너 -->
        <div class="main-container">
          <!-- 비디오 영역 (2/3) -->
          <div class="video-container" :class="{ 'full-width': !showChat }">
            <!-- 내 비디오 -->
            <div class="my-video">
              <video
                ref="myVideoRef"
                autoplay
                muted
                playsinline
                class="video-element"
              />
              <div class="video-label">나</div>
            </div>

            <!-- 다른 참여자들 비디오 -->
            <div class="participants-video">
              <div
                v-for="participant in participants"
                :key="participant.id"
                class="participant-video"
              >
                <video
                  :ref="`participantVideo_${participant.id}`"
                  autoplay
                  playsinline
                  class="video-element"
                />
                <div class="video-label">{{ participant.name }}</div>
              </div>
            </div>
          </div>

          <!-- 채팅 토글 버튼 -->
          <div class="chat-toggle-container">
            <v-btn
              :icon="showChat ? 'mdi-chevron-right' : 'mdi-chevron-left'"
              variant="text"
              size="small"
              class="chat-toggle-btn"
              @click="toggleChat"
            />
          </div>

          <!-- 채팅 영역 (1/3) -->
          <div class="chat-sidebar" :class="{ 'chat-hidden': !showChat }">
            <div class="chat-header">
              <h4>채팅</h4>
              <v-btn
                icon="mdi-close"
                variant="text"
                size="small"
                @click="toggleChat"
              />
            </div>
            <div class="chat-messages" ref="chatMessagesRef">
              <div
                v-for="message in chatMessages"
                :key="message.id"
                class="chat-message"
              >
                <div class="message-avatar">
                  {{ message.sender.charAt(0) }}
                </div>
                <div class="message-content">
                  <div class="message-sender">{{ message.sender }}</div>
                  <div class="message-text">{{ message.text }}</div>
                  <div class="message-time">{{ message.time }}</div>
                </div>
              </div>
            </div>
            <div class="chat-input">
              <v-text-field
                v-model="newMessage"
                placeholder="메시지를 입력하세요..."
                variant="outlined"
                density="compact"
                hide-details
                @keyup.enter="sendMessage"
              />
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useMeetingStore } from '@/store/meetingStore'

// Props
const props = defineProps({
  currentChannel: String,
  selectedChannel: String // 선택된 하위 채널
})

// Store
const meetingStore = useMeetingStore()

// 반응형 데이터
const showStartMeetingModal = ref(false)
const showMeetingDetailModal = ref(false)
const showVideoCall = ref(false)
const selectedMembers = ref([])
const selectedMeeting = ref(null)
const currentMeeting = ref(null)
const currentMeetingRoom = ref(null)
const isMuted = ref(false)
const isVideoOn = ref(true)
const isScreenSharing = ref(false)
const callStartTime = ref(null)
const callDuration = ref('00:00')
const participants = ref([])
const chatMessages = ref([])
const newMessage = ref('')
const showChat = ref(true)

// 페이지네이션 관련 데이터
const currentPage = ref(1)
const itemsPerPage = ref(10)
const isLoading = ref(false)
const hasMoreData = ref(true)

// 비디오 참조
const myVideoRef = ref(null)
const chatMessagesRef = ref(null)

// 팀 멤버 목록
const teamMembers = ref([
  { id: 'kim_minsu', name: '김민수', avatar: '김', status: 'online' },
  { id: 'lee_jihyun', name: '이지현', avatar: '이', status: 'away' },
  { id: 'park_junyoung', name: '박준영', avatar: '박', status: 'offline' },
  { id: 'choi_sujin', name: '최수진', avatar: '최', status: 'online' },
  { id: 'jung_hyunwoo', name: '정현우', avatar: '정', status: 'away' },
  { id: 'han_soyoung', name: '한소영', avatar: '한', status: 'online' }
])

// 회의 데이터 생성 함수
const generateMeetingData = (channelId, count) => {
  const channelConfigs = {
    'general-meeting': {
      title: '일반 회의실',
      description: '팀의 일반적인 회의를 위한 공간입니다.',
      meetingTypes: ['팀 미팅', '주간 리뷰', '프로젝트 진행 상황 논의', '기획서 리뷰', '일일 스탠드업', '코드 리뷰', '기술 세미나', '고객 피드백 회의']
    },
    'project-meeting': {
      title: '프로젝트 회의실',
      description: '프로젝트 관련 회의를 위한 전용 공간입니다.',
      meetingTypes: ['프로젝트 A 기획', '프로젝트 B 리뷰', '프로젝트 C 설계', '프로젝트 D 테스트', '프로젝트 E 배포', '프로젝트 F 유지보수', '프로젝트 G 최적화', '프로젝트 H 마이그레이션']
    },
    'brainstorming': {
      title: '브레인스토밍',
      description: '창의적인 아이디어 발상을 위한 공간입니다.',
      meetingTypes: ['신규 서비스 아이디어', '마케팅 전략', 'UX/UI 개선', '기능 추가 아이디어', '비즈니스 모델', '고객 경험 개선', '제품 로드맵', '혁신 아이디어']
    }
  }

  const config = channelConfigs[channelId]
  const meetings = []
  
  for (let i = 0; i < count; i++) {
    const meetingType = config.meetingTypes[i % config.meetingTypes.length]
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    const participants = Math.floor(Math.random() * 6) + 2
    const duration = ['30분', '45분', '1시간', '1시간 30분', '2시간', '2시간 30분'][Math.floor(Math.random() * 6)]
    
    meetings.push({
      id: `meeting_${channelId}_${i + 1}`,
      title: `[${date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}] ${meetingType}`,
      date: date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      duration: duration,
      participants: participants,
      participantsList: Array.from({ length: participants }, (_, idx) => ({
        id: `member_${idx}`,
        name: ['김민수', '이지현', '박준영', '최수진', '정현우', '한소영'][idx % 6],
        avatar: ['김', '이', '박', '최', '정', '한'][idx % 6],
        status: ['online', 'away', 'offline'][Math.floor(Math.random() * 3)],
        isHost: idx === 0
      })),
      summary: `${meetingType}에 대한 회의를 진행했습니다.`,
      isActive: i === 0 && Math.random() > 0.7
    })
  }
  
  return {
    title: config.title,
    description: config.description,
    meetings: meetings
  }
}

// 채널별 회의 기록 데이터 (각각 20개)
const meetingData = {
  'general-meeting': generateMeetingData('general-meeting', 20),
  'project-meeting': generateMeetingData('project-meeting', 20),
  'brainstorming': generateMeetingData('brainstorming', 20)
}

// 현재 선택된 채널의 데이터
const currentChannelData = computed(() => {
  const channelId = props.selectedChannel || 'general-meeting'
  return meetingData[channelId] || meetingData['general-meeting']
})

// 페이지네이션된 회의 기록
const meetingHistory = computed(() => {
  const allMeetings = currentChannelData.value.meetings
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return allMeetings.slice(0, endIndex)
})

// 전체 회의 수
const totalMeetings = computed(() => {
  return currentChannelData.value.meetings.length
})

// 더 많은 데이터가 있는지 확인
const hasMoreMeetings = computed(() => {
  return meetingHistory.value.length < totalMeetings.value
})

// 일반 회의실인지 확인
const isGeneralMeeting = computed(() => {
  return (props.selectedChannel || 'general-meeting') === 'general-meeting'
})

// 미팅 참여 상태 확인
const isCurrentlyInMeeting = computed(() => {
  return meetingStore.isCurrentlyInMeeting
})

// 미팅 참여 가능 여부 확인
const canJoinMeeting = computed(() => {
  return !isCurrentlyInMeeting.value
})

// 호스트 여부 확인
const isHost = computed(() => {
  return currentMeeting.value?.participantsList?.some(p => p.isHost && p.id === 'me') || false
})

// 계산된 속성
const callTimer = ref(null)

// 메서드
const startMeeting = () => {
  showStartMeetingModal.value = true
}

const closeStartMeetingModal = () => {
  showStartMeetingModal.value = false
  selectedMembers.value = []
}

const confirmStartMeeting = async () => {
  try {
    // 새 회의 생성 - 더 많은 참여자 추가
    const participantsList = [
      { id: 'me', name: '나', avatar: '나', status: 'online', isHost: true },
      { id: 'kim_minsu', name: '김민수', avatar: '김', status: 'online', isHost: false },
      { id: 'lee_jihyun', name: '이지현', avatar: '이', status: 'online', isHost: false },
      { id: 'park_junyoung', name: '박준영', avatar: '박', status: 'away', isHost: false },
      { id: 'choi_sujin', name: '최수진', avatar: '최', status: 'online', isHost: false },
      { id: 'jung_hyunwoo', name: '정현우', avatar: '정', status: 'online', isHost: false }
    ]
    
    const newMeeting = {
      id: `meeting_${Date.now()}`,
      title: `[${new Date().toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}] 팀 회의`,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      duration: '진행 중',
      participants: participantsList.length,
      participantsList: participantsList,
      summary: '',
      isActive: true
    }
    
    // 새 탭에서 미팅 열기
    meetingStore.openMeetingInNewTab(newMeeting)
    
    // 회의 기록에 추가
    meetingHistory.value.unshift(newMeeting)
    
    // 현재 회의 설정
    currentMeeting.value = newMeeting
    currentMeetingRoom.value = { ...newMeeting, isActive: true, participants: participantsList.length }
    
    // 화상회의 참여자 설정 (나를 제외한 다른 참여자들)
    participants.value = participantsList.filter(p => p.id !== 'me')
    
    // 모달 닫기
    showStartMeetingModal.value = false
    selectedMembers.value = []
    
  } catch (error) {
    console.error('미팅 시작 실패:', error)
    alert(error.message || '미팅을 시작할 수 없습니다.')
  }
}

const joinMeeting = async () => {
  try {
    if (!canJoinMeeting.value) {
      alert('이미 다른 미팅에 참여 중입니다.')
      return
    }

    // 현재 미팅 데이터 가져오기
    const meetingData = currentMeeting.value || currentMeetingRoom.value
    if (!meetingData) {
      alert('참여할 미팅이 없습니다.')
      return
    }

    // 새 탭에서 미팅 참여
    meetingStore.openMeetingInNewTab(meetingData)
    
    // 화상회의 참여자 설정 (나를 제외한 다른 참여자들)
    if (meetingData.participantsList) {
      participants.value = meetingData.participantsList.filter(p => p.id !== 'me')
    }
    
  } catch (error) {
    console.error('미팅 참여 실패:', error)
    alert(error.message || '미팅에 참여할 수 없습니다.')
  }
}

// 기존 회의에 참여하기 (프로젝트 회의실용)
const joinExistingMeeting = async () => {
  try {
    if (!canJoinMeeting.value) {
      alert('이미 다른 미팅에 참여 중입니다.')
      return
    }

    // 기존 회의에 참여하는 시뮬레이션 - 더 많은 참여자 추가
    const participantsList = [
      { id: 'host', name: '김민수', avatar: '김', status: 'online', isHost: true },
      { id: 'member1', name: '이지현', avatar: '이', status: 'online', isHost: false },
      { id: 'member2', name: '박준영', avatar: '박', status: 'online', isHost: false },
      { id: 'member3', name: '최수진', avatar: '최', status: 'away', isHost: false },
      { id: 'member4', name: '정현우', avatar: '정', status: 'online', isHost: false },
      { id: 'me', name: '나', avatar: '나', status: 'online', isHost: false }
    ]
    
    const existingMeeting = {
      id: 'existing_meeting',
      title: '[9.24] 프로젝트 진행 상황 논의',
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      duration: '진행 중',
      participants: participantsList.length,
      participantsList: participantsList,
      summary: '',
      isActive: true
    }
    
    // 새 탭에서 미팅 참여
    meetingStore.openMeetingInNewTab(existingMeeting)
    
    // 현재 회의 설정
    currentMeeting.value = existingMeeting
    currentMeetingRoom.value = { ...existingMeeting, isActive: true, participants: participantsList.length }
    
    // 화상회의 참여자 설정 (나를 제외한 다른 참여자들)
    participants.value = participantsList.filter(p => p.id !== 'me')
    
  } catch (error) {
    console.error('미팅 참여 실패:', error)
    alert(error.message || '미팅에 참여할 수 없습니다.')
  }
}

const openMeetingDetail = (meeting) => {
  selectedMeeting.value = meeting
  showMeetingDetailModal.value = true
}

const closeMeetingDetailModal = () => {
  showMeetingDetailModal.value = false
  selectedMeeting.value = null
}

const downloadMeeting = (meeting) => {
  // 회의록 다운로드 로직
  console.log('회의록 다운로드:', meeting.title)
}

const refreshMeetings = () => {
  // 회의 기록 새로고침
  currentPage.value = 1
  hasMoreData.value = true
  console.log('회의 기록 새로고침')
}

// 더 많은 데이터 로드
const loadMoreMeetings = () => {
  if (isLoading.value || !hasMoreMeetings.value) return
  
  isLoading.value = true
  
  // 시뮬레이션을 위한 지연
  setTimeout(() => {
    currentPage.value += 1
    isLoading.value = false
    
    if (meetingHistory.value.length >= totalMeetings.value) {
      hasMoreData.value = false
    }
  }, 500)
}

// 스크롤 이벤트 핸들러
const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target
  
  // 스크롤이 하단 근처에 도달했을 때 (50px 이내)
  if (scrollHeight - scrollTop <= clientHeight + 50) {
    loadMoreMeetings()
  }
}

const toggleMemberSelection = (memberId) => {
  const index = selectedMembers.value.indexOf(memberId)
  if (index > -1) {
    selectedMembers.value.splice(index, 1)
  } else {
    selectedMembers.value.push(memberId)
  }
}

const getStatusColor = (status) => {
  const colorMap = {
    'online': 'success',
    'away': 'warning',
    'busy': 'error',
    'offline': 'grey'
  }
  return colorMap[status] || 'grey'
}

const getStatusText = (status) => {
  const statusMap = {
    'online': '온라인',
    'away': '자리비움',
    'busy': '바쁨',
    'offline': '오프라인'
  }
  return statusMap[status] || status
}

const endCall = () => {
  // Store에서 미팅 종료
  meetingStore.endMeeting()
  
  showVideoCall.value = false
  currentMeeting.value = null
  participants.value = []
  chatMessages.value = []
  
  // 비디오 스트림 정리
  if (myVideoRef.value && myVideoRef.value.srcObject) {
    const tracks = myVideoRef.value.srcObject.getTracks()
    tracks.forEach(track => track.stop())
    myVideoRef.value.srcObject = null
  }
  
  // 타이머 정리
  if (callTimer.value) {
    clearInterval(callTimer.value)
    callTimer.value = null
  }
  
  // 회의실 상태 업데이트
  if (currentMeetingRoom.value) {
    currentMeetingRoom.value.isActive = false
  }
}

// 호스트가 회의를 종료하는 함수
const endMeetingAsHost = () => {
  if (confirm('회의를 종료하시겠습니까? 모든 참여자가 회의에서 나가게 됩니다.')) {
    // 모든 참여자에게 회의 종료 알림 (실제로는 WebSocket이나 서버를 통해)
    // 여기서는 시뮬레이션으로 처리
    
    // 회의 기록 업데이트 (종료 시간 기록)
    if (meetingHistory.value.length > 0) {
      const activeMeeting = meetingHistory.value.find(m => m.isActive)
      if (activeMeeting) {
        activeMeeting.isActive = false
        activeMeeting.duration = '종료됨'
      }
    }
    
    // 회의실 상태 비활성화
    currentMeetingRoom.value = null
    currentMeeting.value = null
    
    // Store에서 미팅 종료
    meetingStore.endMeeting()
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
}

const toggleVideo = () => {
  isVideoOn.value = !isVideoOn.value
}

const toggleScreenShare = () => {
  isScreenSharing.value = !isScreenSharing.value
}

const toggleChat = () => {
  showChat.value = !showChat.value
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  const message = {
    id: Date.now(),
    sender: '나',
    text: newMessage.value.trim(),
    time: new Date().toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  chatMessages.value.push(message)
  newMessage.value = ''
  
  // 채팅 스크롤을 맨 아래로
  setTimeout(() => {
    if (chatMessagesRef.value) {
      chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
    }
  }, 100)
}

const startCallTimer = () => {
  callTimer.value = setInterval(() => {
    if (callStartTime.value) {
      const now = new Date()
      const diff = now - callStartTime.value
      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      callDuration.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  }, 1000)
}

// 비디오 스트림 초기화
const initializeVideoStreams = async () => {
  try {
    // 내 비디오 스트림 가져오기
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    })
    
    if (myVideoRef.value) {
      myVideoRef.value.srcObject = stream
    }
    
    // 다른 참여자들의 더미 비디오 스트림 생성
    participants.value.forEach((participant, index) => {
      setTimeout(() => {
        const participantVideoRef = document.querySelector(`[ref="participantVideo_${participant.id}"]`)
        if (participantVideoRef) {
          // 더미 비디오 스트림 생성 (실제로는 WebRTC로 연결되어야 함)
          const canvas = document.createElement('canvas')
          canvas.width = 640
          canvas.height = 480
          const ctx = canvas.getContext('2d')
          
          // 참여자 이름을 캔버스에 그리기
          ctx.fillStyle = '#333'
          ctx.fillRect(0, 0, 640, 480)
          ctx.fillStyle = '#fff'
          ctx.font = '24px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(participant.name, 320, 240)
          
          // 캔버스를 스트림으로 변환
          const dummyStream = canvas.captureStream(30)
          participantVideoRef.srcObject = dummyStream
        }
      }, index * 500) // 각 참여자마다 0.5초씩 지연
    })
    
  } catch (error) {
    console.error('비디오 스트림 초기화 실패:', error)
  }
}

// 채널 변경 감지
watch(() => props.selectedChannel, () => {
  // 채널이 변경되면 페이지 리셋
  currentPage.value = 1
  hasMoreData.value = true
})

// 화상회의 모달이 열릴 때 비디오 스트림 초기화
watch(() => showVideoCall.value, (newValue) => {
  if (newValue) {
    // 모달이 열릴 때 약간의 지연 후 비디오 스트림 초기화
    setTimeout(() => {
      initializeVideoStreams()
    }, 100)
  }
})

// 생명주기
onMounted(() => {
  // 컴포넌트 마운트 시 초기화
})

onUnmounted(() => {
  // 컴포넌트 언마운트 시 정리
  if (callTimer.value) {
    clearInterval(callTimer.value)
  }
})
</script>

<style scoped>
.team-meeting {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(var(--v-theme-background));
}

/* 헤더 */
.meeting-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meeting-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
}

.meeting-subtitle {
  margin: 0;
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.meeting-status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 4px 8px;
  background: rgba(var(--v-theme-success), 0.1);
  border: 1px solid rgba(var(--v-theme-success), 0.3);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--v-theme-success));
  width: fit-content;
}

/* 활성 회의 섹션 */
.active-meeting-section {
  padding: 24px;
}

.meeting-status-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: rgba(var(--v-theme-success), 0.1);
  border: 1px solid rgba(var(--v-theme-success), 0.3);
  border-radius: 12px;
}

.meeting-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 기존 회의 안내 섹션 */
.existing-meeting-section {
  padding: 24px;
}

.meeting-info-card {
  background: rgba(var(--v-theme-primary), 0.05);
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  border-radius: 12px;
  padding: 20px;
}

.info-content {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.info-icon {
  font-size: 32px;
}

.info-text h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.info-text p {
  margin: 0;
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.meeting-details {
  display: flex;
  gap: 24px;
  margin-top: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.status-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-icon {
  font-size: 32px;
}

.status-info h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: rgb(var(--v-theme-success));
}

.status-info p {
  margin: 0;
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

/* 회의 요약 섹션 */
.meeting-summary-section {
  flex: 1;
  padding: 40px 24px 80px 24px;
  overflow-y: auto;
  background: rgba(var(--v-theme-on-surface), 0.02);
  margin-top: 24px;
  border-radius: 16px 16px 0 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.section-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: -0.5px;
}

.refresh-btn {
  color: rgba(var(--v-theme-on-surface), 0.6);
  transition: all 0.2s ease;
}

.refresh-btn:hover {
  color: rgb(var(--v-theme-primary));
  transform: rotate(180deg);
}

/* 타임라인 디자인 */
.meeting-timeline {
  position: relative;
  padding-left: 24px;
}

.meeting-timeline::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(0, 0, 0, 0.1);
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item:hover {
  transform: translateX(8px);
}

.timeline-item.is-active {
  transform: translateX(8px);
}

.timeline-dot {
  position: absolute;
  left: -24px;
  top: 8px;
  width: 24px;
  height: 24px;
  background: rgb(var(--v-theme-surface));
  border: 3px solid rgb(var(--v-theme-primary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
}

.timeline-item.is-active .timeline-dot {
  background: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 4px rgba(var(--v-theme-primary), 0.2);
}

.dot-inner {
  width: 8px;
  height: 8px;
  background: rgb(var(--v-theme-primary));
  border-radius: 50%;
}

.timeline-content {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  border-radius: 16px;
  padding: 20px 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}


.timeline-item:hover .timeline-content {
  border-color: rgba(var(--v-theme-primary), 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.meeting-header-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.timeline-content .meeting-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.4;
  flex: 1;
  margin-right: 16px;
}

.meeting-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.timeline-item:hover .meeting-actions {
  opacity: 1;
}

.action-btn {
  color: rgba(var(--v-theme-on-surface), 0.6);
  transition: all 0.2s ease;
}

.action-btn:hover {
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
}

.meeting-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-weight: 500;
}

.meta-item span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 모달 스타일 */
.start-meeting-modal,
.meeting-detail-modal {
  background: rgb(var(--v-theme-surface));
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.1), rgba(var(--v-theme-primary), 0.05));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  color: rgb(var(--v-theme-primary));
  font-size: 24px;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.modal-body {
  padding: 24px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group:last-child {
  margin-bottom: 0;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
}

.members-selection {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.2);
  border-radius: 8px;
  padding: 8px;
}

.member-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.member-item:hover {
  background: rgba(var(--v-theme-primary), 0.1);
}

.member-item.selected {
  background: rgba(var(--v-theme-primary), 0.15);
  border: 1px solid rgba(var(--v-theme-primary), 0.3);
}

.member-info {
  flex: 1;
  margin-left: 12px;
}

.member-name {
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
}

.member-status {
  font-size: 12px;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin-top: 2px;
}

.check-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(var(--v-theme-on-surface), 0.02);
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

/* 회의 상세 모달 */
.meeting-detail-content {
  padding: 24px;
  max-height: 600px;
  overflow-y: auto;
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 20px;
  background: rgb(var(--v-theme-primary));
  border-radius: 2px;
}

.meeting-info-section {
  margin-bottom: 32px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.info-icon {
  color: rgb(var(--v-theme-primary));
  font-size: 20px;
}

.info-content {
  flex: 1;
}

.info-label {
  font-size: 12px;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin-bottom: 4px;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
}

.info-value.active {
  color: rgb(var(--v-theme-success));
  font-weight: 600;
}

.participants-section {
  margin-bottom: 32px;
}

.participants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
}

.participant-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  position: relative;
}

.participant-info {
  flex: 1;
}

.participant-name {
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 2px;
}

.participant-status {
  font-size: 12px;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.host-icon {
  position: absolute;
  top: 8px;
  right: 8px;
}

.meeting-summary-section {
  margin-bottom: 16px;
}

.summary-content {
  padding: 16px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.summary-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
}

/* 화상회의 모달 */
.video-call-modal {
  background: #1a1a1a;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.video-call-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  height: 70px;
  box-sizing: border-box;
}

.call-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.call-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.call-duration {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.call-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 메인 컨테이너 */
.main-container {
  flex: 1;
  display: flex;
  background: #000;
  margin-top: 70px;
  height: calc(100vh - 70px);
  position: relative;
}

.video-container {
  display: flex;
  position: relative;
  background: #000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 75%;
  height: 100%;
}

.video-container.full-width {
  width: 100%;
}

.my-video {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 200px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
  z-index: 10;
}

.participants-video {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
  align-items: center;
  justify-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.participant-video {
  position: relative;
  width: 100%;
  max-width: 350px;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  background: #333;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-label {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

/* 채팅 토글 버튼 */
.chat-toggle-container {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 25;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px 0 0 8px;
  padding: 8px 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-toggle-btn {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
  transition: all 0.3s ease;
}

.chat-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

.chat-sidebar {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 25%;
  min-width: 300px;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.95);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  transform: translateX(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.chat-sidebar.chat-hidden {
  transform: translateX(100%);
  width: 0;
  min-width: 0;
  max-width: 0;
}

/* 화면 공유 버튼 스타일 */
.screen-share-btn {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  color: rgba(255, 255, 255, 0.8) !important;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.chat-message {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
}

.message-sender {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4px;
}

.message-text {
  font-size: 14px;
  color: white;
  line-height: 1.4;
  margin-bottom: 4px;
}

.message-time {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.chat-input {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 로딩 인디케이터 */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: 14px;
}

.no-more-data {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  color: rgba(var(--v-theme-on-surface), 0.5);
  font-size: 14px;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .meeting-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .meeting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .meeting-actions {
    align-self: flex-end;
  }
  
  .main-container {
    flex-direction: column;
    margin-top: 60px;
    height: calc(100vh - 60px);
  }
  
  .video-container {
    flex: 1;
    min-height: 75vh;
    width: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .video-container.full-width {
    flex: 1;
    width: 100%;
  }
  
  .video-call-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding: 12px 16px;
  }
  
  .my-video {
    position: relative;
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
  
  .chat-sidebar {
    position: relative;
    width: 100%;
    height: 25vh;
    transform: translateY(0);
  }
  
  .chat-sidebar.chat-hidden {
    transform: translateY(100%);
  }
  
  .chat-toggle-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
    top: auto;
    transform: none;
  }
}
</style>