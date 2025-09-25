<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  currentChannel: String
})

const theme = useTheme()

// 현재 활성 탭
const activeTab = ref('friendList')

// 친구 목록
const friends = ref([
  {
    id: 1,
    userId: 'kim_minsu',
    name: '김민수',
    status: 'online',
    lastSeen: '방금 전',
    avatar: '김'
  },
  {
    id: 2,
    userId: 'lee_jihyun',
    name: '이지현',
    status: 'away',
    lastSeen: '5분 전',
    avatar: '이'
  },
  {
    id: 3,
    userId: 'park_junyoung',
    name: '박준영',
    status: 'offline',
    lastSeen: '2시간 전',
    avatar: '박'
  },
  {
    id: 4,
    userId: 'choi_sujin',
    name: '최수진',
    status: 'online',
    lastSeen: '방금 전',
    avatar: '최'
  },
  {
    id: 5,
    userId: 'jung_hyunwoo',
    name: '정현우',
    status: 'online',
    lastSeen: '10분 전',
    avatar: '정'
  },
  {
    id: 6,
    userId: 'han_soyoung',
    name: '한소영',
    status: 'busy',
    lastSeen: '30분 전',
    avatar: '한'
  },
  {
    id: 7,
    userId: 'yoon_donghyun',
    name: '윤동현',
    status: 'away',
    lastSeen: '1시간 전',
    avatar: '윤'
  },
  {
    id: 8,
    userId: 'kang_minji',
    name: '강민지',
    status: 'online',
    lastSeen: '방금 전',
    avatar: '강'
  },
  {
    id: 9,
    userId: 'oh_seungmin',
    name: '오승민',
    status: 'offline',
    lastSeen: '3시간 전',
    avatar: '오'
  },
  {
    id: 10,
    userId: 'lim_jiyeon',
    name: '임지연',
    status: 'online',
    lastSeen: '15분 전',
    avatar: '임'
  },
  {
    id: 11,
    userId: 'shin_taewon',
    name: '신태원',
    status: 'away',
    lastSeen: '45분 전',
    avatar: '신'
  },
  {
    id: 12,
    userId: 'kwon_hyerim',
    name: '권혜림',
    status: 'online',
    lastSeen: '방금 전',
    avatar: '권'
  },
  {
    id: 13,
    userId: 'ryu_jongho',
    name: '류종호',
    status: 'busy',
    lastSeen: '2시간 전',
    avatar: '류'
  },
  {
    id: 14,
    userId: 'song_jiwon',
    name: '송지원',
    status: 'offline',
    lastSeen: '1일 전',
    avatar: '송'
  },
  {
    id: 15,
    userId: 'jang_myeongsu',
    name: '장명수',
    status: 'online',
    lastSeen: '5분 전',
    avatar: '장'
  },
  {
    id: 16,
    userId: 'kim_yeonju',
    name: '김연주',
    status: 'away',
    lastSeen: '20분 전',
    avatar: '김'
  },
  {
    id: 17,
    userId: 'lee_hyunseok',
    name: '이현석',
    status: 'online',
    lastSeen: '방금 전',
    avatar: '이'
  },
  {
    id: 18,
    userId: 'park_sunhee',
    name: '박선희',
    status: 'offline',
    lastSeen: '4시간 전',
    avatar: '박'
  },
  {
    id: 19,
    userId: 'choi_jihoon',
    name: '최지훈',
    status: 'busy',
    lastSeen: '1시간 전',
    avatar: '최'
  },
  {
    id: 20,
    userId: 'jung_sohee',
    name: '정소희',
    status: 'online',
    lastSeen: '10분 전',
    avatar: '정'
  }
])

// 친구 요청 목록
const friendRequests = ref([
  {
    id: 21,
    name: '홍길동',
    avatar: '홍',
    time: '2시간 전',
    message: '안녕하세요! 함께 일하고 싶어요'
  },
  {
    id: 22,
    name: '김철수',
    avatar: '김',
    time: '5시간 전',
    message: '프로젝트에 관심이 있어서 연락드려요'
  },
  {
    id: 23,
    name: '이영희',
    avatar: '이',
    time: '1일 전',
    message: '같은 분야에서 일하고 계시네요!'
  },
  {
    id: 24,
    name: '박민수',
    avatar: '박',
    time: '2일 전',
    message: '네트워킹 이벤트에서 만났었는데요'
  },
  {
    id: 25,
    name: '최지영',
    avatar: '최',
    time: '3일 전',
    message: '공통 지인을 통해 소개받았습니다'
  }
])

// 검색어
const searchQuery = ref('')
const searchResults = ref([])

// 모달 관련
const showAddFriendModal = ref(false)
const modalSearchQuery = ref('')
const modalSearchResults = ref([])

// 필터링된 친구 목록
const filteredFriends = computed(() => {
  if (!searchQuery.value.trim()) {
    return friends.value
  }
  
  return friends.value.filter(friend => 
    friend.userId.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    friend.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 통계 계산
const totalFriends = computed(() => friends.value.length)
const pendingRequests = computed(() => friendRequests.value.length)
const onlineFriends = computed(() => friends.value.filter(f => f.status === 'online').length)

// 친구 검색 (기존 친구 목록에서)
const searchFriends = () => {
  if (!searchQuery.value.trim()) {
    return
  }
  
  // 실제로는 필터링된 친구 목록을 표시
  // 현재는 전체 친구 목록을 표시
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
    // 친구 요청 목록에 추가
    friendRequests.value.push({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      time: '방금 전',
      message: `${user.name}님이 친구 요청을 보냈습니다`
    })
    
    // 검색 결과에서 제거
    modalSearchResults.value = modalSearchResults.value.filter(u => u.id !== userId)
    
    console.log(`${user.name}(${user.userId})에게 친구 요청 전송`)
  }
}

// 친구 요청 수락
const acceptFriendRequest = (requestId) => {
  const request = friendRequests.value.find(r => r.id === requestId)
  if (request) {
    friends.value.push({
      id: request.id,
      name: request.name,
      status: 'offline',
      lastSeen: '알 수 없음',
      avatar: request.avatar
    })
    friendRequests.value = friendRequests.value.filter(r => r.id !== requestId)
  }
}

// 친구 요청 거부
const rejectFriendRequest = (requestId) => {
  friendRequests.value = friendRequests.value.filter(r => r.id !== requestId)
}

// 친구 삭제
const deleteFriend = (friendId) => {
  friends.value = friends.value.filter(f => f.id !== friendId)
}

// 상태 색상
const getStatusColor = (status) => {
  switch (status) {
    case 'online': return 'success'
    case 'away': return 'warning'
    case 'busy': return 'error'
    case 'offline': return 'grey'
    default: return 'grey'
  }
}

// 상태 라벨
const getStatusLabel = (status) => {
  switch (status) {
    case 'online': return '온라인'
    case 'away': return '자리 비움'
    case 'busy': return '방해 금지'
    case 'offline': return '오프라인'
    default: return '알 수 없음'
  }
}

// 탭 변경
const changeTab = (tab) => {
  activeTab.value = tab
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
</script>

<template>
  <div class="personal-friends" :class="{ 'dark-mode': theme.global.current.value.dark }">
    <!-- 헤더 -->
    <div class="friends-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">친구 관리</h1>
          <p class="page-subtitle">친구를 추가하고 관리하세요</p>
        </div>
        <v-btn
          color="primary"
          size="large"
          class="add-friend-btn"
          @click="showAddFriendModal = true"
        >
          <v-icon left>mdi-account-plus</v-icon>
          친구 추가
        </v-btn>
      </div>
    </div>

    <!-- 통계 카드 -->
    <div class="stats-cards">
      <div class="stat-card stat-card-primary">
        <div class="stat-content">
          <div class="stat-text">
            <h3 class="stat-title">총 친구 수</h3>
            <div class="stat-number">{{ totalFriends }}</div>
          </div>
          <v-icon class="stat-icon">mdi-account-group</v-icon>
        </div>
      </div>
      
      <div class="stat-card stat-card-warning">
        <div class="stat-content">
          <div class="stat-text">
            <h3 class="stat-title">대기 중인 요청</h3>
            <div class="stat-number">{{ pendingRequests }}</div>
          </div>
          <v-icon class="stat-icon">mdi-clock</v-icon>
        </div>
      </div>
      
      <div class="stat-card stat-card-success">
        <div class="stat-content">
          <div class="stat-text">
            <h3 class="stat-title">온라인 친구</h3>
            <div class="stat-number">{{ onlineFriends }}</div>
          </div>
          <v-icon class="stat-icon">mdi-account-check</v-icon>
        </div>
      </div>
    </div>

    <!-- 탭 네비게이션 -->
    <div class="tab-navigation">
      <button
        class="tab-button"
        :class="{ 'active': activeTab === 'friendList' }"
        @click="changeTab('friendList')"
      >
        친구 목록
      </button>
      <button
        class="tab-button"
        :class="{ 'active': activeTab === 'friendRequests' }"
        @click="changeTab('friendRequests')"
      >
        친구 요청
      </button>
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <!-- 친구 목록 탭 -->
      <div v-if="activeTab === 'friendList'" class="tab-content">
        <div class="content-header">
          <div class="header-left">
            <h2 class="content-title">친구 목록</h2>
          </div>
          <div class="header-right">
            <!-- 검색 바 -->
            <div class="search-container">
              <div class="search-input-wrapper">
                <v-icon class="search-icon">mdi-magnify</v-icon>
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="회원 ID로 친구 검색..." 
                  class="search-input"
                  @input="searchFriends"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div class="friends-list">
          <div
            v-for="friend in filteredFriends"
            :key="friend.id"
            class="friend-item"
          >
            <div class="friend-avatar">
              <v-avatar size="40" color="primary">
                {{ friend.avatar }}
              </v-avatar>
              <div 
                class="status-dot"
                :class="getStatusColor(friend.status)"
              />
            </div>
            <div class="friend-info">
              <div class="friend-name">{{ friend.name }}</div>
              <div class="friend-status">
                {{ getStatusLabel(friend.status) }} • {{ friend.lastSeen }}
              </div>
            </div>
            <div class="friend-actions">
              <v-btn
                icon
                size="small"
                variant="text"
                @click="console.log(`${friend.name}과 채팅 시작`)"
              >
                <v-icon>mdi-message</v-icon>
              </v-btn>
              <v-btn
                icon
                size="small"
                variant="text"
                color="error"
                @click="deleteFriend(friend.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- 친구 요청 탭 -->
      <div v-if="activeTab === 'friendRequests'" class="tab-content">
        <div class="content-header content-header-simple">
          <div class="header-left">
            <h2 class="content-title">친구 요청</h2>
            <p class="content-subtitle">받은 친구 요청을 확인하고 승인하세요</p>
          </div>
        </div>
        
        <!-- 빈 상태 -->
        <div v-if="friendRequests.length === 0" class="empty-state">
          <v-icon class="empty-icon">mdi-email-outline</v-icon>
          <h3 class="empty-title">새로운 친구 요청이 없습니다</h3>
          <p class="empty-subtitle">친구 요청이 들어오면 여기에 표시됩니다</p>
        </div>
        
        <!-- 친구 요청 목록 -->
        <div v-else class="request-list">
          <div
            v-for="request in friendRequests"
            :key="request.id"
            class="request-item"
          >
            <v-avatar size="40" color="primary">
              {{ request.avatar }}
            </v-avatar>
            <div class="request-info">
              <div class="request-name">{{ request.name }}</div>
              <div class="request-message">{{ request.message }}</div>
              <div class="request-time">{{ request.time }}</div>
            </div>
            <div class="request-actions">
              <v-btn
                color="success"
                size="small"
                @click="acceptFriendRequest(request.id)"
              >
                수락
              </v-btn>
              <v-btn
                color="error"
                size="small"
                variant="outlined"
                @click="rejectFriendRequest(request.id)"
              >
                거부
              </v-btn>
            </div>
          </div>
        </div>
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
  </div>
</template>

<style scoped>
.personal-friends {
  padding: 20px;
  height: calc(100vh - 60px);
  background: #f8f9fa;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.personal-friends.dark-mode {
  background: #1a1a1a;
}

/* 헤더 */
.friends-header {
  margin-bottom: 20px;
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
  color: #1a1a1a;
  transition: color 0.3s ease;
}

.dark-mode .page-title {
  color: #ffffff;
}

.page-subtitle {
  color: #666666;
  font-size: 16px;
  transition: color 0.3s ease;
}

.dark-mode .page-subtitle {
  color: #cccccc;
}

.add-friend-btn {
  background: #1976d2 !important;
  color: white !important;
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  padding: 12px 24px;
}

/* 통계 카드 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.stat-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  min-height: 80px;
  border: 1px solid rgba(25, 118, 210, 0.1);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1976d2, #42a5f5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: rgba(25, 118, 210, 0.3);
}

.stat-card:hover::before {
  opacity: 1;
}

.dark-mode .stat-card {
  background: #2d2d2d;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border-color: rgba(100, 181, 246, 0.2);
}

.dark-mode .stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  border-color: rgba(100, 181, 246, 0.4);
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.stat-text {
  flex: 1;
}

.stat-title {
  font-size: 12px;
  font-weight: 500;
  color: #666666;
  margin-bottom: 4px;
  transition: color 0.3s ease;
}

.dark-mode .stat-title {
  color: #cccccc;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  transition: color 0.3s ease;
}

.dark-mode .stat-number {
  color: #ffffff;
}

.stat-icon {
  font-size: 24px;
  color: #1976d2;
  margin-left: 12px;
  opacity: 0.8;
}

/* 카드별 색상 스타일 */
.stat-card-primary {
  border-color: rgba(25, 118, 210, 0.2);
}

.stat-card-primary::before {
  background: linear-gradient(90deg, #1976d2, #42a5f5);
}

.stat-card-primary .stat-icon {
  color: #1976d2;
}

.stat-card-warning {
  border-color: rgba(255, 152, 0, 0.2);
}

.stat-card-warning::before {
  background: linear-gradient(90deg, #ff9800, #ffb74d);
}

.stat-card-warning .stat-icon {
  color: #ff9800;
}

.stat-card-success {
  border-color: rgba(76, 175, 80, 0.2);
}

.stat-card-success::before {
  background: linear-gradient(90deg, #4caf50, #81c784);
}

.stat-card-success .stat-icon {
  color: #4caf50;
}

.dark-mode .stat-card-primary {
  border-color: rgba(100, 181, 246, 0.3);
}

.dark-mode .stat-card-warning {
  border-color: rgba(255, 183, 77, 0.3);
}

.dark-mode .stat-card-success {
  border-color: rgba(129, 199, 132, 0.3);
}

/* 탭 네비게이션 */
.tab-navigation {
  display: flex;
  gap: 0;
  margin-bottom: 16px;
  background: #ffffff;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark-mode .tab-navigation {
  background: #2d2d2d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.tab-button {
  flex: 1;
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: #666666;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background: rgba(25, 118, 210, 0.1);
  color: #1976d2;
}

.tab-button.active {
  background: #1976d2;
  color: white;
  box-shadow: 0 2px 4px rgba(25, 118, 210, 0.3);
}

.dark-mode .tab-button {
  color: #cccccc;
}

.dark-mode .tab-button:hover {
  background: rgba(25, 118, 210, 0.2);
  color: #64b5f6;
}

.dark-mode .tab-button.active {
  background: #1976d2;
  color: white;
}

/* 메인 콘텐츠 */
.main-content {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dark-mode .main-content {
  background: #2d2d2d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.content-header-simple {
  justify-content: flex-start;
  align-items: flex-start;
}

.content-header-simple .header-left {
  display: flex;
  flex-direction: column;
}

.header-left {
  flex: 1;
}

.header-right {
  display: flex;
  align-items: flex-end;
}

.content-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.dark-mode .content-title {
  color: #ffffff;
}

.content-subtitle {
  color: #666666;
  font-size: 16px;
  transition: color 0.3s ease;
}

.dark-mode .content-subtitle {
  color: #cccccc;
}

/* 친구 목록 */
.friends-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
  scrollbar-width: thin;
  scrollbar-color: #c0c0c0 transparent;
}

.friends-list::-webkit-scrollbar {
  width: 8px;
}

.friends-list::-webkit-scrollbar-track {
  background: transparent;
}

.friends-list::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 2px;
}

.friends-list::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}

.friend-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.dark-mode .friend-item {
  background: #3d3d3d;
}

.friend-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark-mode .friend-item:hover {
  background: #4d4d4d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.friend-avatar {
  position: relative;
}

.status-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.dark-mode .status-dot {
  border-color: #2d2d2d;
}

.status-dot.success {
  background: #4caf50;
}

.status-dot.warning {
  background: #ff9800;
}

.status-dot.error {
  background: #f44336;
}

.status-dot.grey {
  background: #9e9e9e;
}

.friend-info {
  flex: 1;
}

.friend-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
  transition: color 0.3s ease;
}

.dark-mode .friend-name {
  color: #ffffff;
}

.friend-status {
  font-size: 14px;
  color: #666666;
  transition: color 0.3s ease;
}

.dark-mode .friend-status {
  color: #cccccc;
}

.friend-actions {
  display: flex;
  gap: 8px;
}

/* 빈 상태 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  color: #cccccc;
  margin-bottom: 24px;
}

.dark-mode .empty-icon {
  color: #666666;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.dark-mode .empty-title {
  color: #ffffff;
}

.empty-subtitle {
  font-size: 16px;
  color: #666666;
  transition: color 0.3s ease;
}

.dark-mode .empty-subtitle {
  color: #cccccc;
}

/* 친구 요청 목록 */
.request-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
  scrollbar-width: thin;
  scrollbar-color: #c0c0c0 transparent;
}

.request-list::-webkit-scrollbar {
  width: 8px;
}

.request-list::-webkit-scrollbar-track {
  background: transparent;
}

.request-list::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 2px;
}

.request-list::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}

.request-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.dark-mode .request-item {
  background: #3d3d3d;
}

.request-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark-mode .request-item:hover {
  background: #4d4d4d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.request-info {
  flex: 1;
}

.request-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
  transition: color 0.3s ease;
}

.dark-mode .request-name {
  color: #ffffff;
}

.request-message {
  font-size: 14px;
  color: #666666;
  margin: 4px 0;
  font-style: italic;
  transition: color 0.3s ease;
}

.dark-mode .request-message {
  color: #cccccc;
}

.request-time {
  font-size: 12px;
  color: #999999;
  transition: color 0.3s ease;
}

.dark-mode .request-time {
  color: #888888;
}

.request-actions {
  display: flex;
  gap: 8px;
}

/* 검색 컨테이너 */
.search-container {
  position: relative;
  width: 300px;
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

/* 반응형 디자인 */
@media (max-width: 768px) {
  .personal-friends {
    padding: 20px;
    height: calc(100vh - 56px);
  }
  
  .friends-list,
  .request-list {
    max-height: 300px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .main-content {
    padding: 20px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .friend-item,
  .request-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .friend-actions,
  .request-actions {
    align-self: flex-end;
  }
}
</style>
