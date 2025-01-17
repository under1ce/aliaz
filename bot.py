import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from aiogram.filters import Command

TOKEN = "7528428509:AAGCrCR_A6ZfA5sF0JfIx5sP1nDIliajxUM"

# Создаём бота и диспетчер с передачей объекта Bot
bot = Bot(token=TOKEN)
dp = Dispatcher(bot)

# Команда /start или /play отправляет кнопку с Web App
@dp.message(Command("start"))
@dp.message(Command("play"))
async def send_game_link(message: types.Message):
    keyboard = InlineKeyboardMarkup()
    game_button = InlineKeyboardButton(
        text="🎮 Играть в Alias",
        web_app=WebAppInfo(url="https://alliaz.vercel.app")  # Замени на свою ссылку
    )
    keyboard.add(game_button)

    await message.answer("Нажми на кнопку, чтобы открыть игру в Telegram:", reply_markup=keyboard)

# Функция запуска бота
async def main():
    await dp.start_polling()

if __name__ == "__main__":
    asyncio.run(main())  # Запуск бота
