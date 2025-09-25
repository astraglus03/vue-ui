<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentChannel: String
})

// 사용자 정보
const userInfo = ref({
  name: '김민수',
  userId: 'minsu123',
  email: 'minsu@example.com',
  phone: '010-1234-5678',
  profileImage: null,
  joinDate: '2024-01-15',
  lastLogin: '2024-12-20',
  statusMessage: '오늘도 화이팅! 💪'
})

// 알림 설정 (전체 알림만)
const allNotifications = ref(true)

// 프로필 수정 모드
const editMode = ref(false)
const editForm = ref({ ...userInfo.value })

// 비밀번호 변경 다이얼로그
const passwordDialog = ref(false)
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 회원탈퇴 다이얼로그
const deleteAccountDialog = ref(false)


// 프로필 수정 저장
const saveProfile = () => {
  userInfo.value = { ...editForm.value }
  editMode.value = false
  console.log('프로필 저장됨')
}

// 프로필 수정 취소
const cancelEdit = () => {
  editForm.value = { ...userInfo.value }
  editMode.value = false
}

// 비밀번호 변경
const changePassword = () => {
  if (passwordForm.value.newPassword === passwordForm.value.confirmPassword) {
    console.log('비밀번호 변경됨')
    passwordDialog.value = false
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } else {
    console.log('비밀번호가 일치하지 않습니다')
  }
}

// 회원탈퇴
const deleteAccount = () => {
  console.log('회원탈퇴 처리')
  deleteAccountDialog.value = false
}

// 로그아웃
const logout = () => {
  console.log('로그아웃')
}

</script>

<template>
  <div class="personal-profile" :class="{ 'dark-mode': $vuetify.theme.global.current.dark }">
    <!-- 헤더 -->
    <div class="profile-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">마이페이지</h1>
          <p class="page-subtitle">개인 정보와 활동을 확인하세요</p>
        </div>
        <div class="header-right">
          <v-btn
            color="primary"
            variant="outlined"
            @click="logout"
            class="logout-btn"
          >
            <v-icon left>mdi-logout</v-icon>
            로그아웃
          </v-btn>
        </div>
      </div>
    </div>

    <div class="profile-content">
      <!-- 프로필 카드 -->
      <v-card class="profile-card" elevation="0">
        <div class="profile-banner">
          <div class="banner-gradient"></div>
          <div class="profile-info">
            <div class="profile-avatar">
              <v-avatar size="120" color="primary" class="avatar-shadow">
                <span class="text-white font-weight-bold text-h3">
                  {{ userInfo.name.charAt(0) }}
                </span>
              </v-avatar>
              <v-btn
                icon
                size="small"
                color="white"
                class="edit-avatar-btn"
                @click="editMode = true"
              >
                <v-icon>mdi-camera</v-icon>
              </v-btn>
            </div>
            
            <div class="profile-details">
              <div v-if="!editMode" class="profile-display">
                <h2 class="profile-name">{{ userInfo.name }}</h2>
                <p class="profile-id">@{{ userInfo.userId }}</p>
                <div class="status-message">
                  <v-icon size="16">mdi-message-text</v-icon>
                  <span>{{ userInfo.statusMessage }}</span>
                </div>
                <div class="profile-meta">
                  <div class="meta-item">
                    <v-icon size="16">mdi-email</v-icon>
                    <span>{{ userInfo.email }}</span>
                  </div>
                  <div class="meta-item">
                    <v-icon size="16">mdi-phone</v-icon>
                    <span>{{ userInfo.phone }}</span>
                  </div>
                  <div class="meta-item">
                    <v-icon size="16">mdi-calendar</v-icon>
                    <span>가입일: {{ userInfo.joinDate }}</span>
                  </div>
                </div>
              </div>
              
              <div v-else class="profile-edit">
                <v-text-field
                  v-model="editForm.name"
                  label="이름"
                  variant="outlined"
                  class="mb-3"
                />
                <v-text-field
                  v-model="editForm.userId"
                  label="사용자 ID"
                  variant="outlined"
                  class="mb-3"
                />
                <v-text-field
                  v-model="editForm.email"
                  label="이메일"
                  variant="outlined"
                  class="mb-3"
                />
                <v-text-field
                  v-model="editForm.phone"
                  label="전화번호"
                  variant="outlined"
                  class="mb-3"
                />
                <v-text-field
                  v-model="editForm.statusMessage"
                  label="상태메시지"
                  variant="outlined"
                  placeholder="상태메시지를 입력하세요"
                  counter="50"
                  maxlength="50"
                />
              </div>
            </div>
          </div>
          
          <div class="profile-actions">
            <v-btn
              v-if="!editMode"
              color="primary"
              variant="outlined"
              @click="editMode = true"
              class="edit-btn"
            >
              <v-icon left>mdi-account-edit</v-icon>
              프로필 수정
            </v-btn>
            <div v-else class="edit-actions">
              <v-btn
                color="primary"
                @click="saveProfile"
                class="save-btn"
              >
                <v-icon left>mdi-check</v-icon>
                저장
              </v-btn>
              <v-btn
                variant="outlined"
                @click="cancelEdit"
                class="cancel-btn"
              >
                <v-icon left>mdi-close</v-icon>
                취소
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>


      <!-- 설정 카드들 -->
      <div class="settings-grid">
        <!-- 알림 설정 -->
        <v-card class="setting-card" elevation="0">
          <div class="setting-header">
            <div class="setting-icon">
              <v-icon size="24" color="primary">mdi-bell</v-icon>
            </div>
            <div class="setting-info">
              <h3>알림 설정</h3>
              <p>알림 수신 여부를 설정하세요</p>
            </div>
          </div>
          <div class="setting-content">
            <v-switch
              v-model="allNotifications"
              label="전체 알림"
              color="primary"
              hide-details
            />
          </div>
        </v-card>

        <!-- 보안 설정 -->
        <v-card class="setting-card" elevation="0">
          <div class="setting-header">
            <div class="setting-icon">
              <v-icon size="24" color="warning">mdi-shield</v-icon>
            </div>
            <div class="setting-info">
              <h3>보안 설정</h3>
              <p>계정 보안을 관리하세요</p>
            </div>
          </div>
          <div class="setting-content">
            <v-btn
              color="primary"
              variant="outlined"
              @click="passwordDialog = true"
              class="setting-btn"
            >
              <v-icon left>mdi-key</v-icon>
              비밀번호 변경
            </v-btn>
          </div>
        </v-card>

        <!-- 계정 관리 -->
        <v-card class="setting-card" elevation="0">
          <div class="setting-header">
            <div class="setting-icon">
              <v-icon size="24" color="error">mdi-account-cog</v-icon>
            </div>
            <div class="setting-info">
              <h3>계정 관리</h3>
              <p>계정 관련 설정을 관리하세요</p>
            </div>
          </div>
          <div class="setting-content">
            <v-btn
              color="error"
              variant="outlined"
              @click="deleteAccountDialog = true"
              class="setting-btn"
            >
              <v-icon left>mdi-delete</v-icon>
              회원탈퇴
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>

    <!-- 비밀번호 변경 다이얼로그 -->
    <v-dialog v-model="passwordDialog" max-width="500">
      <v-card class="dialog-card">
        <v-card-title class="dialog-title">
          <v-icon left color="primary">mdi-key</v-icon>
          비밀번호 변경
        </v-card-title>
        <v-card-text class="dialog-content">
          <v-text-field
            v-model="passwordForm.currentPassword"
            label="현재 비밀번호"
            type="password"
            variant="outlined"
            class="mb-4"
            prepend-inner-icon="mdi-lock"
          />
          <v-text-field
            v-model="passwordForm.newPassword"
            label="새 비밀번호"
            type="password"
            variant="outlined"
            class="mb-4"
            prepend-inner-icon="mdi-lock-plus"
          />
          <v-text-field
            v-model="passwordForm.confirmPassword"
            label="새 비밀번호 확인"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock-check"
          />
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-spacer />
          <v-btn variant="outlined" @click="passwordDialog = false" class="cancel-btn">
            취소
          </v-btn>
          <v-btn color="primary" @click="changePassword" class="confirm-btn">
            <v-icon left>mdi-check</v-icon>
            변경
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 회원탈퇴 다이얼로그 -->
    <v-dialog v-model="deleteAccountDialog" max-width="500">
      <v-card class="dialog-card">
        <v-card-title class="dialog-title text-error">
          <v-icon left color="error">mdi-delete</v-icon>
          회원탈퇴
        </v-card-title>
        <v-card-text class="dialog-content">
          <div class="warning-message">
            <v-icon color="error" size="48" class="warning-icon">mdi-alert-circle</v-icon>
            <h3>정말로 회원탈퇴를 하시겠습니까?</h3>
            <p>이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.</p>
          </div>
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-spacer />
          <v-btn variant="outlined" @click="deleteAccountDialog = false" class="cancel-btn">
            취소
          </v-btn>
          <v-btn color="error" @click="deleteAccount" class="confirm-btn">
            <v-icon left>mdi-delete</v-icon>
            탈퇴
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.personal-profile {
  padding: 24px;
  min-height: calc(100vh - 60px);
  background: #f8fafc;
  transition: all 0.3s ease;
}

/* 다크모드 */
.personal-profile.dark-mode {
  background: #0f0f23;
}

/* 헤더 */
.profile-header {
  margin-bottom: 32px;
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

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
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

.logout-btn {
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 프로필 카드 */
.profile-card {
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
}

.dark-mode .profile-card {
  background: #1e1e1e;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.2);
}

.profile-banner {
  position: relative;
  background: #3b82f6;
  padding: 40px 32px;
  color: white;
}

.banner-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(59, 130, 246, 0.95);
}

.profile-info {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.profile-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar-shadow {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.edit-avatar-btn {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  border: 2px solid white;
}

.profile-details {
  flex: 1;
}

.profile-name {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
  color: white;
}

.profile-id {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 12px;
  color: white;
}

.status-message {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 16px;
  color: white;
  font-style: italic;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  opacity: 0.9;
  color: white;
}

.profile-actions {
  position: relative;
  display: flex;
  gap: 12px;
  z-index: 10;
}

.edit-btn {
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  border: 2px solid rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.edit-btn:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.8) !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.edit-btn :deep(.v-icon) {
  color: white !important;
}

.save-btn {
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  background: white !important;
  color: #3b82f6 !important;
  border: 2px solid white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 80px;
}

.save-btn:hover {
  background: #f8fafc !important;
  color: #2563eb !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.save-btn :deep(.v-icon) {
  color: #3b82f6 !important;
}

.save-btn:hover :deep(.v-icon) {
  color: #2563eb !important;
}

.cancel-btn {
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  border: 2px solid rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(10px);
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.8) !important;
  transform: translateY(-1px);
}

.edit-actions {
  display: flex;
  gap: 12px;
}


/* 설정 그리드 */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.setting-card {
  border-radius: 12px;
  padding: 24px;
  background: white;
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
}

.dark-mode .setting-card {
  background: #1e1e1e;
  border-color: rgba(59, 130, 246, 0.2);
}

.setting-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.2);
}

.dark-mode .setting-card:hover {
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
}

.setting-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.setting-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.1);
}

.setting-info h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1a1a1a;
}

.dark-mode .setting-info h3 {
  color: #ffffff;
}

.setting-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.dark-mode .setting-info p {
  color: #ccc;
}

.setting-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-btn {
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .personal-profile {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .header-right {
    width: 100%;
    justify-content: flex-end;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .profile-info {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .profile-banner {
    padding: 24px 20px;
  }
  
  
  .settings-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  
  .setting-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  
  .profile-actions {
    flex-direction: column;
  }
  
  .edit-actions {
    flex-direction: column;
  }
}

/* 다이얼로그 스타일 */
.dialog-card {
  border-radius: 16px;
  overflow: hidden;
}

.dialog-title {
  font-size: 20px;
  font-weight: 600;
  padding: 24px 24px 0 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dialog-content {
  padding: 24px;
}

.dialog-actions {
  padding: 0 24px 24px 24px;
  gap: 12px;
}

.cancel-btn, .confirm-btn {
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  min-width: 100px;
}

.warning-message {
  text-align: center;
  padding: 20px 0;
}

.warning-icon {
  margin-bottom: 16px;
}

.warning-message h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1a1a1a;
}

.dark-mode .warning-message h3 {
  color: #ffffff;
}

.warning-message p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.dark-mode .warning-message p {
  color: #ccc;
}
</style>
