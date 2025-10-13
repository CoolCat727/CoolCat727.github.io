import { ref } from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const md = new MarkdownIt({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(code, { language: lang }).value}</code></pre>`
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`
  }
})


async function thinkAndGenerateReply(userText) {
  try {
    const response = await axios.post('https://epub.leovibe.cc/ai-generate', {
      question: userText,
      coolcat: 'coolcat'
    })

    return response.data.answer || 'AI 沒有回應任何內容。'
  } catch (error) {
    console.error('Failed to get AI response:', error.message)
    return '抱歉，AI 回覆時出現錯誤 😥'
  }
}

const MessageSpeed = () => {
  let speed = 30;
  const minSpeed = 1;
  let charCount = 0;
  let nextThreshold = getRandomThreshold();

  function getRandomThreshold() {
    return Math.floor(Math.random() * 6) + 5;
  }

  return {
    getSpeed: () => {
      charCount++;

      if (charCount >= nextThreshold) {
        if (speed > minSpeed) {
          speed--;
        }
        charCount = 0;
        nextThreshold = getRandomThreshold();
      }

      return speed;
    }
  };
};


export async function useAiAgent(chat) {
  chat.onMessage(async (message) => {
    if (message.sender === 'user') {
      chat.isInputDisabled = true
      chat.replyIsthinking = true
      const reply = await thinkAndGenerateReply(message.text)
      chat.replyIsthinking = false

      const renderedHtml = md.render(reply)

      const replyMessage = {
        sender: 'ai',
        text: ref('')
      }
      chat.pushMessage(replyMessage)
      const sessageSpeed = MessageSpeed()
      for (const char of renderedHtml) {
        replyMessage.text.value += char
        await sleep(sessageSpeed.getSpeed())
      }

      chat.isInputDisabled = false
    }
  })
}

