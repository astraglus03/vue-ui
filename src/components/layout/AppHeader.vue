<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isDark: Boolean,
  currentWorkspace: Object,
  memberSidebarVisible: Boolean
})

const emit = defineEmits(['toggle-theme', 'toggle-member-sidebar', 'toggle-notification-sidebar'])

// 알림 개수 계산
const notificationCount = computed(() => {
  return Object.values(notifications.value).flat().filter(n => !n.read).length
})

// 프로필 메뉴 상태
const profileMenuOpen = ref(false)

// 알림 사이드바 상태
const notificationSidebarVisible = ref(false)

// 알림 카테고리별 데이터 (개인 워크스페이스용)
const notifications = ref({
  friend_requests: [
    { 
      id: 1, 
      type: 'friend_request', 
      message: '김민수가 친구 요청을 보냈습니다', 
      time: '5분 전', 
      read: false,
      user: { name: '김민수', avatar: '김', status: 'online' }
    },
    { 
      id: 2, 
      type: 'friend_request', 
      message: '이지현님이 친구 요청을 보냈습니다', 
      time: '1시간 전', 
      read: false,
      user: { name: '이지현', avatar: '이', status: 'away' }
    },
    { 
      id: 3, 
      type: 'friend_request', 
      message: '박준영님이 친구 요청을 보냈습니다', 
      time: '2시간 전', 
      read: true,
      user: { name: '박준영', avatar: '박', status: 'offline' }
    }
  ],
  personal_tasks: [
    { 
      id: 4, 
      type: 'task_assigned', 
      message: '프로젝트 기획서 작성 업무가 할당되었습니다', 
      time: '30분 전', 
      read: false,
      task: { title: '프로젝트 기획서 작성', priority: 'high', dueDate: '2024-01-15' }
    },
    { 
      id: 5, 
      type: 'task_reminder', 
      message: '회의 준비 자료 검토 업무가 곧 마감됩니다', 
      time: '1시간 전', 
      read: false,
      task: { title: '회의 준비 자료 검토', priority: 'medium', dueDate: '2024-01-14' }
    },
    { 
      id: 6, 
      type: 'task_completed', 
      message: '데이터 분석 보고서 작성이 완료되었습니다', 
      time: '3시간 전', 
      read: true,
      task: { title: '데이터 분석 보고서 작성', priority: 'high', dueDate: '2024-01-13' }
    }
  ]
})

// 현재 선택된 알림 카테고리
const activeNotificationTab = ref('friend_requests')

// 알림 카테고리 탭 목록
const notificationTabs = [
  { 
    key: 'friend_requests', 
    title: '친구 요청', 
    icon: 'mdi-account-plus',
    count: 2 // 읽지 않은 친구 요청 수
  },
  { 
    key: 'personal_tasks', 
    title: '개인 업무', 
    icon: 'mdi-clipboard-check',
    count: 2 // 읽지 않은 개인 업무 수
  }
]

// 워크스페이스 설정 관련
const workspaceSettingsOpen = ref(false)
const isWorkspaceOwner = ref(true) // 임시로 true 설정
const expandedChannels = ref(new Set()) // 펼쳐진 채널들

// 팀 채널 목록
const teamChannels = ref([
  { id: 'dashboard', name: '팀 대시보드', icon: 'mdi-view-dashboard' },
  { id: 'chat', name: '팀 채팅', icon: 'mdi-chat' },
  { id: 'schedule', name: '팀 일정관리', icon: 'mdi-calendar-check' },
  { id: 'drive', name: '팀 드라이브', icon: 'mdi-folder' },
  { id: 'meeting', name: '팀 화상회의', icon: 'mdi-video' }
])

// 권한 옵션
const permissionOptions = [
  { title: '매니저', value: 'manager' },
  { title: '회원', value: 'member' }
]

// 팀 멤버 목록 (임시 데이터)
const teamMembers = ref([
  { id: 'user1', name: '김민수', avatar: '김', role: 'owner', status: 'online' },
  { id: 'user2', name: '이지현', avatar: '이', role: 'manager', status: 'away' },
  { id: 'user3', name: '박준영', avatar: '박', role: 'member', status: 'offline' },
  { id: 'user4', name: '최수진', avatar: '최', role: 'member', status: 'online' },
  { id: 'user5', name: '정현우', avatar: '정', role: 'member', status: 'away' }
])

// 채널별 멤버 권한 설정 (임시 데이터)
const channelMemberPermissions = ref({
  dashboard: {
    user1: 'manager', // owner는 자동으로 manager
    user2: 'manager',
    user3: 'member',
    user4: 'member',
    user5: 'member'
  },
  chat: {
    user1: 'manager',
    user2: 'member',
    user3: 'member',
    user4: 'member',
    user5: 'member'
  },
  schedule: {
    user1: 'manager',
    user2: 'manager',
    user3: 'member',
    user4: 'member',
    user5: 'member'
  },
  drive: {
    user1: 'manager',
    user2: 'member',
    user3: 'member',
    user4: 'member',
    user5: 'member'
  },
  meeting: {
    user1: 'manager',
    user2: 'member',
    user3: 'member',
    user4: 'member',
    user5: 'member'
  }
})

// 프로필 메뉴 아이템들
const profileMenuItems = [
  { title: '프로필 수정', icon: 'mdi-account-edit', action: 'edit-profile' },
  { title: '설정', icon: 'mdi-cog', action: 'settings' },
  { divider: true },
  { title: '로그아웃', icon: 'mdi-logout', action: 'logout' }
]


// 메뉴 액션 처리
const handleProfileAction = (action) => {
  profileMenuOpen.value = false
  
  switch (action) {
    case 'edit-profile':
      // 프로필 수정 페이지로 이동
      console.log('프로필 수정')
      break
    case 'settings':
      // 설정 페이지로 이동
      console.log('설정')
      break
    case 'logout':
      // 로그아웃 처리
      console.log('로그아웃')
      break
  }
}

// 알림 사이드바 토글
const toggleNotificationSidebar = () => {
  notificationSidebarVisible.value = !notificationSidebarVisible.value
  emit('toggle-notification-sidebar', notificationSidebarVisible.value)
}

// 알림 클릭 처리
const handleNotificationClick = (notification) => {
  // 알림 읽음 처리 및 해당 페이지로 이동
  notification.read = true
  console.log('알림 클릭:', notification)
}

// 친구 요청 수락/거절 처리
const handleFriendRequest = (notification, action) => {
  if (action === 'accept') {
    console.log('친구 요청 수락:', notification.user.name)
    // 친구 요청 수락 로직
  } else if (action === 'reject') {
    console.log('친구 요청 거절:', notification.user.name)
    // 친구 요청 거절 로직
  }
  notification.read = true
}

// 개인 업무 알림 처리
const handleTaskNotification = (notification) => {
  console.log('개인 업무 알림 클릭:', notification.task.title)
  notification.read = true
  // 해당 업무 페이지로 이동
}

// 알림 카테고리 탭 변경
const changeNotificationTab = (tabKey) => {
  activeNotificationTab.value = tabKey
}

// 모든 알림 읽음 처리
const markAllAsRead = () => {
  Object.values(notifications.value).flat().forEach(notification => {
    notification.read = true
  })
}

// 현재 활성 탭의 알림 목록 가져오기
const getCurrentNotifications = () => {
  return notifications.value[activeNotificationTab.value] || []
}

// 업무 우선순위 색상 가져오기
const getTaskPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'error'
    case 'medium': return 'warning'
    case 'low': return 'success'
    default: return 'grey'
  }
}

// 업무 우선순위 텍스트 가져오기
const getPriorityText = (priority) => {
  switch (priority) {
    case 'high': return '높음'
    case 'medium': return '보통'
    case 'low': return '낮음'
    default: return '없음'
  }
}

// 업무 타입별 아이콘 가져오기
const getTaskIcon = (type) => {
  switch (type) {
    case 'task_assigned': return 'mdi-clipboard-plus'
    case 'task_reminder': return 'mdi-clock-alert'
    case 'task_completed': return 'mdi-check-circle'
    default: return 'mdi-clipboard-check'
  }
}

// 워크스페이스 설정 열기
const openWorkspaceSettings = () => {
  workspaceSettingsOpen.value = true
}

// 채널별 멤버 권한 가져오기
const getChannelMemberPermission = (channelId, memberId) => {
  return channelMemberPermissions.value[channelId]?.[memberId] || 'member'
}

// 채널별 멤버 권한 업데이트
const updateChannelMemberPermission = (channelId, memberId, permission) => {
  if (!channelMemberPermissions.value[channelId]) {
    channelMemberPermissions.value[channelId] = {}
  }
  channelMemberPermissions.value[channelId][memberId] = permission
}

// 멤버 상태 색상 가져오기
const getMemberStatusColor = (status) => {
  switch (status) {
    case 'online': return 'success'
    case 'away': return 'warning'
    case 'busy': return 'error'
    case 'offline': return 'grey'
    default: return 'grey'
  }
}

// 채널 펼침/접힘 토글
const toggleChannelExpansion = (channelId) => {
  if (expandedChannels.value.has(channelId)) {
    expandedChannels.value.delete(channelId)
  } else {
    expandedChannels.value.add(channelId)
  }
}

// 채널이 펼쳐져 있는지 확인
const isChannelExpanded = (channelId) => {
  return expandedChannels.value.has(channelId)
}

// 워크스페이스 설정 저장
const saveWorkspaceSettings = () => {
  // 실제로는 API 호출로 서버에 저장
  console.log('워크스페이스 설정 저장:', channelMemberPermissions.value)
  workspaceSettingsOpen.value = false
}
</script>

<template>
  <v-app-bar 
    :elevation="0" 
    class="app-header"
    :class="{ 'dark-header': isDark }"
    fixed
  >
    <!-- 왼쪽 영역 -->
    <div class="header-left">
      <!-- 로고/서비스명 -->
      <v-btn 
        variant="text" 
        class="logo-btn"
        @click="$router.push('/')"
      >
        <span class="logo-text">synco</span>
      </v-btn>
    </div>

    <!-- 중앙 영역 -->
    <div class="header-center">
      <!-- 중앙 영역은 비워둠 -->
    </div>

    <!-- 오른쪽 영역 -->
    <div class="header-right">
      <!-- 검색바 (알림 바로 왼쪽) -->
      <div class="search-container">
        <div class="search-input-wrapper">
          <v-icon class="search-icon">mdi-magnify</v-icon>
          <input 
            type="text" 
            placeholder="검색" 
            class="search-input"
          />
        </div>
      </div>

      <!-- 알림 -->
      <v-btn 
        icon 
        variant="text"
        class="notification-btn"
        :color="notificationSidebarVisible ? 'primary' : ''"
        @click="toggleNotificationSidebar"
      >
        <v-badge 
          :content="notificationCount" 
          :model-value="notificationCount > 0"
          color="error"
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <v-tooltip activator="parent" location="bottom">알림</v-tooltip>
      </v-btn>

      <!-- 멤버 목록 토글 (팀 워크스페이스일 때만 표시) -->
      <v-btn 
        v-if="currentWorkspace?.type === 'team'"
        icon 
        variant="text"
        :color="memberSidebarVisible ? 'primary' : ''"
        @click="emit('toggle-member-sidebar')"
      >
        <v-icon>mdi-account-group</v-icon>
      </v-btn>

      <!-- 워크스페이스 설정 버튼 (팀 워크스페이스이고 생성자일 때만 표시) -->
      <v-btn 
        v-if="currentWorkspace?.type === 'team' && isWorkspaceOwner"
        icon 
        variant="text"
        @click="openWorkspaceSettings"
        class="workspace-settings-btn"
      >
        <v-icon>mdi-cog</v-icon>
        <v-tooltip activator="parent" location="bottom">워크스페이스 설정</v-tooltip>
      </v-btn>

      <!-- 테마 토글 -->
      <v-btn 
        icon 
        variant="text"
        @click="emit('toggle-theme')"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <!-- 프로필 -->
      <v-menu 
        v-model="profileMenuOpen"
        :close-on-content-click="false"
        location="bottom end"
        offset="8"
      >
        <template v-slot:activator="{ props: menuProps }">
          <v-btn 
            icon 
            variant="text"
            class="profile-btn"
            v-bind="menuProps"
          >
            <v-avatar size="32" color="primary">
              <span class="text-white font-weight-bold">A</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card class="profile-menu" min-width="200">
          <v-list>
            <template v-for="item in profileMenuItems" :key="item.title">
              <v-divider v-if="item.divider" />
              <v-list-item
                v-else
                @click="handleProfileAction(item.action)"
              >
                <template v-slot:prepend>
                  <v-icon>{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>

  <!-- 워크스페이스 설정 다이얼로그 -->
  <v-dialog 
    v-model="workspaceSettingsOpen" 
    max-width="800"
  >
    <v-card>
      <v-card-title>워크스페이스 설정</v-card-title>
      
      <v-card-text>
        <!-- 채널별 멤버 권한 설정 -->
        <div class="channel-permissions">
          <h3 class="text-h6 mb-4">채널별 멤버 권한 설정</h3>
          
          <div class="permission-section">
            <div 
              v-for="channel in teamChannels" 
              :key="channel.id"
              class="channel-permission-group"
            >
              <div 
                class="channel-header"
                @click="toggleChannelExpansion(channel.id)"
              >
                <v-icon>{{ channel.icon }}</v-icon>
                <span class="channel-name">{{ channel.name }}</span>
                <v-icon class="expand-icon" :class="{ 'expanded': isChannelExpanded(channel.id) }">
                  mdi-chevron-down
                </v-icon>
              </div>
              
              <v-expand-transition>
                <div v-show="isChannelExpanded(channel.id)" class="member-permissions">
                  <div 
                    v-for="member in teamMembers" 
                    :key="member.id"
                    class="member-permission-item"
                  >
                    <div class="member-info">
                      <v-avatar size="32" :color="getMemberStatusColor(member.status)">
                        {{ member.avatar }}
                      </v-avatar>
                      <div class="member-name">{{ member.name }}</div>
                    </div>
                    
                    <div class="permission-controls">
                      <v-select
                        :model-value="getChannelMemberPermission(channel.id, member.id)"
                        :items="member.role === 'owner' ? [{ title: '매니저', value: 'manager' }] : permissionOptions"
                        :disabled="member.role === 'owner'"
                        variant="outlined"
                        density="compact"
                        hide-details
                        @update:model-value="updateChannelMemberPermission(channel.id, member.id, $event)"
                        class="permission-select"
                      />
                    </div>
                  </div>
                </div>
              </v-expand-transition>
            </div>
          </div>
        </div>

        <!-- 워크스페이스 정보 -->
        <div class="workspace-info-section mt-6">
          <h3 class="text-h6 mb-4">워크스페이스 정보</h3>
          
          <div class="workspace-details">
            <div class="detail-item">
              <label>워크스페이스 이름</label>
              <v-text-field
                :model-value="currentWorkspace?.name"
                variant="outlined"
                density="compact"
                readonly
              />
            </div>
            
            <div class="detail-item">
              <label>멤버 수</label>
              <v-text-field
                :model-value="currentWorkspace?.members || 0"
                variant="outlined"
                density="compact"
                readonly
              />
            </div>
          </div>
        </div>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer />
        <v-btn 
          variant="text" 
          @click="workspaceSettingsOpen = false"
        >
          닫기
        </v-btn>
        <v-btn 
          color="primary" 
          @click="saveWorkspaceSettings"
        >
          저장
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 알림 사이드바 -->
  <v-navigation-drawer
    v-model="notificationSidebarVisible"
    location="right"
    width="400"
    temporary
    class="notification-sidebar"
  >
    <!-- 사이드바 헤더 -->
    <div class="sidebar-header">
      <div class="header-content">
        <v-icon class="header-icon">mdi-bell</v-icon>
        <span class="header-title">알림</span>
        <v-spacer />
        <v-btn 
          size="small" 
          variant="text"
          @click="markAllAsRead"
          :disabled="notificationCount === 0"
        >
          모두 읽음
        </v-btn>
      </div>
    </div>
    
    <v-divider />
    
    <!-- 알림 카테고리 탭 -->
    <v-tabs 
      v-model="activeNotificationTab"
      class="notification-tabs"
      @update:model-value="changeNotificationTab"
    >
      <v-tab 
        v-for="tab in notificationTabs" 
        :key="tab.key"
        :value="tab.key"
        class="notification-tab"
      >
        <v-icon size="small" class="tab-icon">{{ tab.icon }}</v-icon>
        <span class="tab-title">{{ tab.title }}</span>
        <v-chip 
          v-if="tab.count > 0"
          size="x-small" 
          color="error" 
          class="tab-badge"
        >
          {{ tab.count }}
        </v-chip>
      </v-tab>
    </v-tabs>
    
    <v-divider />
    
    <!-- 알림 목록 -->
    <div class="notification-content">
      <!-- 친구 요청 탭 -->
      <div v-if="activeNotificationTab === 'friend_requests'" class="notification-list">
        <div 
          v-for="notification in getCurrentNotifications()" 
          :key="notification.id"
          class="notification-item"
          :class="{ 'unread': !notification.read }"
        >
          <div class="notification-main" @click="handleNotificationClick(notification)">
            <div class="notification-avatar">
              <v-avatar 
                size="40" 
                :color="getMemberStatusColor(notification.user.status)"
              >
                <span class="text-white font-weight-bold">{{ notification.user.avatar }}</span>
              </v-avatar>
              <div 
                class="status-indicator"
                :class="notification.user.status"
              ></div>
            </div>
            
            <div class="notification-info">
              <div class="notification-message">{{ notification.message }}</div>
              <div class="notification-time">{{ notification.time }}</div>
            </div>
          </div>
          
          <div v-if="!notification.read" class="notification-actions">
            <v-btn 
              size="small" 
              color="success" 
              variant="tonal"
              @click.stop="handleFriendRequest(notification, 'accept')"
            >
              <v-icon size="small">mdi-check</v-icon>
              수락
            </v-btn>
            <v-btn 
              size="small" 
              color="error" 
              variant="tonal"
              @click.stop="handleFriendRequest(notification, 'reject')"
            >
              <v-icon size="small">mdi-close</v-icon>
              거절
            </v-btn>
          </div>
        </div>
      </div>
      
      <!-- 개인 업무 탭 -->
      <div v-else-if="activeNotificationTab === 'personal_tasks'" class="notification-list">
        <div 
          v-for="notification in getCurrentNotifications()" 
          :key="notification.id"
          class="notification-item task-notification"
          :class="{ 'unread': !notification.read }"
          @click="handleTaskNotification(notification)"
        >
          <div class="notification-main">
            <div class="notification-icon">
              <v-icon 
                :color="notification.read ? 'grey' : getTaskPriorityColor(notification.task.priority)"
                size="24"
              >
                {{ getTaskIcon(notification.type) }}
              </v-icon>
            </div>
            
            <div class="notification-info">
              <div class="notification-message">{{ notification.message }}</div>
              <div class="task-details">
                <v-chip 
                  size="x-small" 
                  :color="getTaskPriorityColor(notification.task.priority)"
                  variant="tonal"
                  class="priority-chip"
                >
                  {{ getPriorityText(notification.task.priority) }}
                </v-chip>
                <span class="task-due-date">{{ notification.task.dueDate }}</span>
              </div>
              <div class="notification-time">{{ notification.time }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 빈 상태 -->
      <div v-if="getCurrentNotifications().length === 0" class="empty-state">
        <v-icon size="48" color="grey">mdi-bell-off</v-icon>
        <div class="empty-message">새로운 알림이 없습니다</div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
.app-header {
  background: rgba(0, 0, 0, 0.2) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 60px !important;
}

.dark-header {
  background: rgba(0, 0, 0, 0.4) !important;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 200px;
}

.header-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 300px;
  justify-content: flex-end;
  padding-right: 16px;
}

.logo-btn {
  font-size: 20px;
  font-weight: 600;
  color: rgb(var(--v-theme-primary)) !important;
}

.logo-text {
  font-weight: 700;
}

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
  z-index: 2;
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
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-surface), 1);
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.1);
}

.search-input::placeholder {
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.workspace-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.workspace-icon {
  background: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  font-weight: 600;
}

.workspace-name {
  font-size: 16px;
  font-weight: 600;
}

.notification-menu,
.profile-menu {
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.notification-header {
  padding: 16px 20px 8px;
  font-weight: 600;
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-message {
  font-size: 14px;
  font-weight: 500;
}

.notification-time {
  font-size: 12px;
  opacity: 0.7;
}

.unread {
  background: rgba(var(--v-theme-primary), 0.05);
}

.unread .notification-message {
  font-weight: 600;
}



.channel-permissions {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 8px;
  padding: 16px;
}

.permission-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.channel-permission-group {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 8px;
  background: rgba(var(--v-theme-surface), 0.5);
  margin-bottom: 16px;
}

.channel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  background: rgba(var(--v-theme-primary), 0.05);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.channel-header:hover {
  background: rgba(var(--v-theme-primary), 0.1);
}

.channel-name {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  font-size: 16px;
  flex: 1;
}

.expand-icon {
  transition: transform 0.2s ease;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.member-permissions {
  padding: 8px;
}

.member-permission-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
}

.member-permission-item:hover {
  background: rgba(var(--v-theme-primary), 0.05);
}

.member-permission-item:last-child {
  margin-bottom: 0;
}

.member-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.member-name {
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  font-size: 14px;
}

.permission-controls {
  min-width: 120px;
}

.permission-select {
  font-size: 14px;
}

.workspace-info-section {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 8px;
  padding: 16px;
}

.workspace-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item label {
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  font-size: 14px;
}

/* 알림 사이드바 스타일 */
.notification-sidebar {
  border-left: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.sidebar-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-primary-darken-1)));
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.header-icon {
  margin-right: 12px;
  font-size: 24px;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
}

.notification-tabs {
  background: rgba(var(--v-theme-surface), 0.8);
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.notification-tab {
  min-width: 120px;
  padding: 16px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.tab-icon {
  font-size: 18px;
}

.tab-title {
  font-size: 14px;
  font-weight: 500;
}

.tab-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  min-width: 18px;
  height: 18px;
  font-size: 10px;
}

.notification-content {
  height: calc(100vh - 200px);
  overflow-y: auto;
}

.notification-list {
  padding: 8px;
}

.notification-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  background: rgba(var(--v-theme-surface), 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
}

.notification-item:hover {
  background: rgba(var(--v-theme-primary), 0.05);
  border-color: rgba(var(--v-theme-primary), 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.notification-item.unread {
  background: rgba(var(--v-theme-primary), 0.08);
  border-color: rgba(var(--v-theme-primary), 0.3);
  box-shadow: 0 2px 8px rgba(var(--v-theme-primary), 0.2);
}

.notification-main {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.notification-avatar {
  position: relative;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.online {
  background: #4caf50;
}

.status-indicator.away {
  background: #ff9800;
}

.status-indicator.busy {
  background: #f44336;
}

.status-indicator.offline {
  background: #9e9e9e;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.1);
}

.notification-info {
  flex: 1;
  min-width: 0;
}

.notification-message {
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 4px;
  line-height: 1.4;
}

.notification-time {
  font-size: 12px;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.task-details {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
}

.priority-chip {
  font-size: 10px;
  height: 18px;
}

.task-due-date {
  font-size: 11px;
  color: rgba(var(--v-theme-on-surface), 0.7);
  background: rgba(var(--v-theme-on-surface), 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.notification-actions {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-message {
  margin-top: 16px;
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .header-center {
    display: none;
  }
  
  .header-right {
    gap: 8px;
  }
  
  .notification-sidebar {
    width: 100vw !important;
  }
  
  .notification-tab {
    min-width: 100px;
    padding: 12px 8px;
  }
  
  .tab-title {
    font-size: 12px;
  }
}
</style>
