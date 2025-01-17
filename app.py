import os
import json
from flask import Flask, Response, jsonify

app = Flask(__name__)

# Абсолютный путь к папке с проектом
BASE_PATH = "/Users/underice/Desktop/alliaz"

# Маппинг уровней сложности к файлам
file_map = {
    'easy': 'rus_easy.txt',
    'medium': 'rus_medium.txt',
    'hardcore': 'rus_hardcore.txt'
}

@app.route('/get-words/<difficulty>', methods=['GET'])
def get_words(difficulty):
    # Получаем имя файла для выбранного уровня сложности
    file_name = file_map.get(difficulty)

    # Если уровень сложности некорректен, возвращаем ошибку
    if not file_name:
        return jsonify({"error": "Invalid difficulty level"}), 400

    # Строим полный путь к файлу
    file_path = os.path.join(BASE_PATH, file_name)

    # Проверяем, существует ли файл
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    # Читаем слова из файла с явной кодировкой UTF-8
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            words = file.readlines()
            words = [word.strip() for word in words]  # Убираем лишние пробелы и символы новой строки

        # Отдаем данные в правильном формате с явной кодировкой UTF-8
        response_data = json.dumps({"words": words}, ensure_ascii=False)
        return Response(response_data, mimetype='application/json')
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
