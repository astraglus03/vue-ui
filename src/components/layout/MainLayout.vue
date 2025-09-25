<script setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import AppHeader from './AppHeader.vue'
import ServerSidebar from './ServerSidebar.vue'
import WorkspaceSidebar from './WorkspaceSidebar.vue'
import MainContent from './MainContent.vue'
import UserStatus from './UserStatus.vue'
import { usePermissions, PERMISSION_TYPES } from '@/composables/usePermissions'

const theme = useTheme()

// 테마 토글 함수
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

// 현재 테마 상태
const isDark = computed(() => theme.global.current.value.dark)

// 권한 시스템 초기화
const { setUserRole } = usePermissions()

// 사이드바 상태 관리
const serverSidebarCollapsed = ref(false)
const workspaceSidebarCollapsed = ref(false)
const memberSidebarVisible = ref(false)

// 현재 선택된 워크스페이스
const currentWorkspace = ref('personal') // 'personal' 또는 'team'
const currentChannel = ref('dashboard') // 현재 채널
const selectedSubChannel = ref('') // 선택된 하위 채널

// 워크스페이스 목록 (임시 데이터)
const workspaces = ref([
  { id: 'personal', name: '내 워크스페이스', type: 'personal', icon: 'mdi-home' },
  { id: 'team1', name: '스타트업 팀', type: 'team', icon: 'S', members: 6 },
  { id: 'team2', name: '개발팀', type: 'team', icon: 'D', members: 8 },
  { id: 'team3', name: '디자인팀', type: 'team', icon: 'G', members: 4 }
])

// 사이드바 토글 함수들
const toggleServerSidebar = () => {
  serverSidebarCollapsed.value = !serverSidebarCollapsed.value
}

const toggleWorkspaceSidebar = () => {
  workspaceSidebarCollapsed.value = !workspaceSidebarCollapsed.value
}

const toggleMemberSidebar = () => {
  memberSidebarVisible.value = !memberSidebarVisible.value
}

// 워크스페이스 선택
const selectWorkspace = (workspaceId) => {
  currentWorkspace.value = workspaceId
  currentChannel.value = 'dashboard'
  selectedSubChannel.value = '' // 하위 채널 선택 초기화
  memberSidebarVisible.value = workspaceId === 'team'
  
  // 워크스페이스별 권한 설정 (테스트용)
  if (workspaceId === 'team') {
    setUserRole(PERMISSION_TYPES.MANAGER, workspaceId)
  } else {
    setUserRole(PERMISSION_TYPES.PARTICIPANT, workspaceId)
  }
}

// 채널 선택
const selectChannel = (channelId) => {
  currentChannel.value = channelId
  selectedSubChannel.value = '' // 하위 채널 선택 초기화
}

// MainContent에서 채널 변경 요청 처리
const handleNavigateToChannel = (channelId) => {
  selectChannel(channelId)
}

// 하위 채널 선택
const selectSubChannel = (parentId, subChannelId) => {
  selectedSubChannel.value = subChannelId
  
  // 팀 채팅의 하위 채널인 경우
  if (parentId === 'chat') {
    currentChannel.value = 'chat'
    // TeamChat 컴포넌트에 선택된 하위 채널 정보 전달
    window.dispatchEvent(new CustomEvent('select-chat-channel', { 
      detail: { parentId, subChannelId } 
    }))
  }
  // 팀 화상회의의 하위 채널인 경우
  else if (parentId === 'meeting') {
    currentChannel.value = 'meeting'
    // TeamMeeting 컴포넌트에 선택된 하위 채널 정보 전달
    window.dispatchEvent(new CustomEvent('select-meeting-channel', { 
      detail: { parentId, subChannelId } 
    }))
  }
  // 팀 일정관리의 하위 채널인 경우
  else if (parentId === 'schedule') {
    currentChannel.value = 'schedule'
    // TeamSchedule 컴포넌트에 선택된 하위 채널 정보 전달
    window.dispatchEvent(new CustomEvent('select-schedule-channel', { 
      detail: { parentId, subChannelId } 
    }))
  }
}

// 현재 워크스페이스 정보
const currentWorkspaceInfo = computed(() => {
  return workspaces.value.find(w => w.id === currentWorkspace.value)
})
</script>

<template>
  <v-app>
    <!-- 헤더 -->
    <AppHeader 
      :is-dark="isDark"
      :current-workspace="currentWorkspaceInfo"
      :member-sidebar-visible="memberSidebarVisible"
      @toggle-theme="toggleTheme"
      @toggle-member-sidebar="toggleMemberSidebar"
    />

    <!-- 메인 컨테이너 -->
    <v-main class="main-container">
      <!-- 서버 사이드바 -->
      <ServerSidebar 
        :collapsed="false"
        :workspaces="workspaces"
        :current-workspace="currentWorkspace"
        @select-workspace="selectWorkspace"
      />

      <!-- 워크스페이스 사이드바 -->
      <WorkspaceSidebar 
        :collapsed="workspaceSidebarCollapsed"
        :workspace-type="currentWorkspaceInfo?.type"
        :current-channel="currentChannel"
        :current-workspace-data="currentWorkspaceInfo"
        :selected-sub-channel="selectedSubChannel"
        @toggle="toggleWorkspaceSidebar"
        @select-channel="selectChannel"
        @select-subchannel="selectSubChannel"
      />

      <!-- 메인 컨텐츠 -->
      <MainContent 
        :workspace-type="currentWorkspaceInfo?.type"
        :current-channel="currentChannel"
        :member-sidebar-visible="memberSidebarVisible"
        :workspace-sidebar-collapsed="workspaceSidebarCollapsed"
        @navigate-to-channel="handleNavigateToChannel"
      />

      <!-- 사용자 상태 (개인 워크스페이스일 때만 표시) -->
      <UserStatus 
        v-if="currentWorkspaceInfo?.type === 'personal'"
        :collapsed="workspaceSidebarCollapsed"
      />
    </v-main>
  </v-app>
</template>

<style scoped>
.main-container {
  display: flex;
  min-height: 100vh;
  padding-top: 60px; /* 헤더 높이만큼 패딩 */
  width: 100vw;
  overflow-x: hidden;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .main-container {
    padding-top: 56px;
  }
}
</style>
