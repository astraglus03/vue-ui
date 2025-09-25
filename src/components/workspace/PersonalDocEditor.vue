<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  document: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isOpen', 'save', 'close'])

// 문서 내용
const documentContent = ref('')
const originalContent = ref('')
const isModified = ref(false)

// 편집 상태
const isEditing = ref(true)
const isSaving = ref(false)
const lastSaved = ref(null)

// 문서 초기화
const initializeDocument = () => {
  if (props.document) {
    documentContent.value = props.document.content || '문서를 작성해보세요...'
    originalContent.value = props.document.content || ''
    isModified.value = false
    lastSaved.value = new Date()
  }
}

// 내용 변경 감지
const handleContentChange = () => {
  isModified.value = documentContent.value !== originalContent.value
}

// 문서 저장
const saveDocument = async () => {
  isSaving.value = true
  
  try {
    // 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    originalContent.value = documentContent.value
    isModified.value = false
    lastSaved.value = new Date()
    
    emit('save', {
      id: props.document.id,
      content: documentContent.value,
      modifiedDate: new Date().toISOString()
    })
  } catch (error) {
    console.error('문서 저장 실패:', error)
  } finally {
    isSaving.value = false
  }
}

// 문서 다운로드 (한글 파일)
const downloadDocument = () => {
  const content = documentContent.value
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `${props.document.name}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// 모달 닫기
const closeEditor = () => {
  if (isModified.value) {
    if (confirm('저장되지 않은 변경사항이 있습니다. 정말 닫으시겠습니까?')) {
      emit('close')
    }
  } else {
    emit('close')
  }
}

// 자동 저장 (5초마다)
let autoSaveInterval = null

const startAutoSave = () => {
  autoSaveInterval = setInterval(() => {
    if (isModified.value && !isSaving.value) {
      saveDocument()
    }
  }, 5000)
}

const stopAutoSave = () => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
    autoSaveInterval = null
  }
}

// 키보드 단축키
const handleKeydown = (event) => {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 's':
        event.preventDefault()
        saveDocument()
        break
      case 'w':
        event.preventDefault()
        closeEditor()
        break
    }
  }
}

// 생명주기
onMounted(() => {
  initializeDocument()
  startAutoSave()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopAutoSave()
  document.removeEventListener('keydown', handleKeydown)
})

// 문서 변경 감지
watch(() => props.document, () => {
  initializeDocument()
}, { deep: true })

// 수정 시간 포맷팅
const formatLastSaved = computed(() => {
  if (!lastSaved.value) return ''
  return lastSaved.value.toLocaleTimeString('ko-KR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
})
</script>

<template>
  <v-dialog :model-value="isOpen" max-width="1200px" fullscreen @update:model-value="$emit('update:isOpen', $event)">
    <v-card class="personal-doc-editor">
      <!-- 헤더 -->
      <div class="editor-header">
        <div class="header-left">
          <v-btn icon="mdi-arrow-left" variant="text" @click="closeEditor" class="back-btn">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <div class="document-info">
            <h2 class="document-title">{{ document.name }}</h2>
            <div class="document-meta">
              <span class="document-type">개인문서</span>
            </div>
          </div>
        </div>
        
        <div class="header-right">
          <div class="save-status">
            <v-icon v-if="isSaving" class="saving-icon" size="16">mdi-loading</v-icon>
            <span v-if="isSaving" class="status-text">저장 중...</span>
            <span v-else-if="isModified" class="status-text modified">수정됨</span>
            <span v-else class="status-text">저장됨 {{ formatLastSaved }}</span>
          </div>
          
          <v-btn
            icon="mdi-download"
            variant="text"
            @click="downloadDocument"
            class="download-btn"
            title="다운로드"
          >
            <v-icon>mdi-download</v-icon>
          </v-btn>
          
          <v-btn
            color="primary"
            @click="saveDocument"
            :loading="isSaving"
            :disabled="!isModified"
            class="save-btn"
          >
            <v-icon left>mdi-content-save</v-icon>
            저장
          </v-btn>
        </div>
      </div>

      <!-- 편집 영역 -->
      <div class="editor-content">
        <div class="editor-toolbar">
          <div class="toolbar-left">
            <v-btn-group variant="text" density="compact">
              <v-btn icon="mdi-format-bold" size="small" title="굵게"></v-btn>
              <v-btn icon="mdi-format-italic" size="small" title="기울임"></v-btn>
              <v-btn icon="mdi-format-underline" size="small" title="밑줄"></v-btn>
            </v-btn-group>
            
            <v-divider vertical class="mx-2"></v-divider>
            
            <v-btn-group variant="text" density="compact">
              <v-btn icon="mdi-format-list-bulleted" size="small" title="글머리 기호"></v-btn>
              <v-btn icon="mdi-format-list-numbered" size="small" title="번호 매기기"></v-btn>
            </v-btn-group>
          </div>
          
          <div class="toolbar-right">
            <v-btn
              icon="mdi-eye"
              variant="text"
              size="small"
              :color="isEditing ? 'primary' : ''"
              @click="isEditing = !isEditing"
              title="편집 모드"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </div>
        </div>
        
        <div class="editor-main">
          <v-textarea
            v-model="documentContent"
            @input="handleContentChange"
            variant="plain"
            placeholder="문서를 작성해보세요..."
            class="document-textarea"
            :readonly="!isEditing"
            auto-grow
            rows="20"
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.personal-doc-editor {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 헤더 */
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.document-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.document-title {
  font-size: 20px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
}

.document-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.save-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.saving-icon {
  animation: spin 1s linear infinite;
}

.status-text {
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.status-text.modified {
  color: #ff9800;
}

.download-btn {
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.save-btn {
  text-transform: none;
}

/* 편집 영역 */
.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(var(--v-theme-on-surface), 0.02);
}

.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.editor-main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.document-textarea {
  width: 100%;
  min-height: 500px;
  font-size: 16px;
  line-height: 1.6;
  background: rgb(var(--v-theme-surface));
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.document-textarea :deep(.v-field__input) {
  min-height: 500px;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
}

.document-textarea :deep(textarea) {
  min-height: 500px;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  resize: none;
}

/* 애니메이션 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 반응형 */
@media (max-width: 768px) {
  .editor-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .editor-toolbar {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .toolbar-right {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
