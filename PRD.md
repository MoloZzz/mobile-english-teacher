PRD: English Sentence Trainer (MVP)
1. Ціль продукту

Допомогти користувачу перейти з B1+ до C1 через:

sentence-based learning
активний recall + generation
простий spaced repetition

Фокус: змушувати генерувати англійську, а не впізнавати

2. Scope (MVP тільки)
Входить:
створення карток (sentence-based)
тренування (3 типи: recall / generation)
простий SRS
локальне збереження
НЕ входить:
авторизація
синхронізація
соціальні фічі
складна аналітика
push-нотифікації
3. Core User Flow
Flow 1: Додавання картки
User відкриває “Create”
Вводить:
Context (UA або EN)
Answer (EN)
Optional variations
Save
Flow 2: Тренування
App показує context
User вводить відповідь (EN)
Натискає “Show answer”
Порівнює
Обирає:
Again
Good
Easy
Flow 3: SRS
App показує тільки “due” картки
Сортування: oldest due first
4. Типи карток
type Card = {
  id: string
  context: string        // “ти був під тиском…”
  answer: string         // “I had to make a decision under pressure”
  variations?: string[]  // optional

  createdAt: number
  dueDate: number
  interval: number       // in days
}
5. SRS логіка (спрощена)
function updateCard(card, rating) {
  if (rating === "again") {
    card.interval = 1
  }

  if (rating === "good") {
    card.interval = Math.max(3, card.interval * 2)
  }

  if (rating === "easy") {
    card.interval = Math.max(7, card.interval * 3)
  }

  card.dueDate = now + intervalInDays(card.interval)
}

Без SM-2. Без складності.

6. Екрани
6.1 Home / Deck
кнопка: “Start training”
кількість due cards
кнопка: “Add card”
6.2 Create Card Screen

Поля:

Context (multiline)
Answer (multiline)
Variations (optional)

Кнопка:

Save
6.3 Training Screen
Step 1:
показ context
input (textarea)
Step 2:
кнопка: Show Answer
Step 3:
показ:
correct answer
variations
Step 4:
кнопки:
Again
Good
Easy
6.4 Simple List (optional)
список всіх карток
edit/delete (мінімально)
7. UX принципи
мінімум кліків
без анімацій
швидкість > краса
одна дія = один екран
8. Tech Stack
React Native (Expo)
State: Zustand або Redux Toolkit (але Zustand простіше)
Storage: AsyncStorage
9. Data Layer
type AppState = {
  cards: Card[]

  addCard(card)
  updateCard(card)
  deleteCard(id)

  getDueCards(): Card[]
}
10. Edge Cases
пустий input → disable save
немає due cards → показати “done for today”
дуже довгі відповіді → scroll
11. Non-Goals (важливо)

Не робити:

gamification
streaks
achievements
AI інтеграцію (на старті)
12. Acceptance Criteria
можна створити картку за <10 сек
тренування без лагів
SRS працює (дата оновлюється)
всі дані зберігаються локально
13. Stretch (після MVP)
AI evaluation (через API)
voice input
import з YouTube
sync
14. Основний ризик

ти перестанеш користуватись

Тому:

час створення < 5 сек
тренування frictionless