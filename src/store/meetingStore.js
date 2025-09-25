import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMeetingStore = defineStore('meeting', () => {
  // 상태
  const isInMeeting = ref(false)
  const currentMeetingId = ref(null)
  const currentMeetingData = ref(null)
  const meetingWindow = ref(null)

  // 게터
  const isCurrentlyInMeeting = computed(() => isInMeeting.value)
  const getCurrentMeetingId = computed(() => currentMeetingId.value)
  const getCurrentMeetingData = computed(() => currentMeetingData.value)

  // 액션
  const startMeeting = (meetingData) => {
    if (isInMeeting.value) {
      throw new Error('이미 다른 미팅에 참여 중입니다.')
    }
    
    isInMeeting.value = true
    currentMeetingId.value = meetingData.id
    currentMeetingData.value = meetingData
  }

  const joinMeeting = (meetingData) => {
    if (isInMeeting.value) {
      throw new Error('이미 다른 미팅에 참여 중입니다.')
    }
    
    isInMeeting.value = true
    currentMeetingId.value = meetingData.id
    currentMeetingData.value = meetingData
  }

  const endMeeting = () => {
    isInMeeting.value = false
    currentMeetingId.value = null
    currentMeetingData.value = null
    
    // 새 탭이 열려있다면 닫기
    if (meetingWindow.value && !meetingWindow.value.closed) {
      meetingWindow.value.close()
    }
    meetingWindow.value = null
  }

  const setMeetingWindow = (window) => {
    meetingWindow.value = window
  }

  const openMeetingInNewTab = (meetingData) => {
    if (isInMeeting.value) {
      throw new Error('이미 다른 미팅에 참여 중입니다.')
    }

    // 새 탭 열기
    const newWindow = window.open(
      `${window.location.origin}/#/meeting/${meetingData.id}`,
      `meeting_${meetingData.id}`,
      'width=1200,height=800,scrollbars=yes,resizable=yes'
    )

    if (newWindow) {
      setMeetingWindow(newWindow)
      startMeeting(meetingData)
      
      // 새 탭이 닫힐 때 상태 업데이트
      const checkClosed = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkClosed)
          endMeeting()
        }
      }, 1000)
    } else {
      throw new Error('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.')
    }
  }

  return {
    // 상태
    isInMeeting,
    currentMeetingId,
    currentMeetingData,
    meetingWindow,
    
    // 게터
    isCurrentlyInMeeting,
    getCurrentMeetingId,
    getCurrentMeetingData,
    
    // 액션
    startMeeting,
    joinMeeting,
    endMeeting,
    setMeetingWindow,
    openMeetingInNewTab
  }
})
