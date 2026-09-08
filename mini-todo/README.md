# Mini To-Do List

Projeto simples para praticar Python (Flask), JavaScript e HTML/CSS.

## Como rodar

```
pip install -r requirements.txt
python app.py
```

Depois abra http://127.0.0.1:5000 no navegador.

## O que ele faz

- O backend (`app.py`) guarda as tarefas em memória e expõe uma API REST simples (`GET`, `POST`, `PATCH`, `DELETE`).
- O frontend (`static/index.html`, `style.css`, `script.js`) consome essa API com `fetch` para adicionar, marcar como concluída e excluir tarefas.
