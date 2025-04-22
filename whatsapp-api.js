'use strict'

async function pesquisarContatos() {
    const url = `https://giovanna-whatsapp.onrender.com/v1/whatsapp/contatos/11987876567`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function criarContato(contato) {
    const container = document.querySelector('.contatos')
    
    const card = document.createElement('div')
    card.classList.add('card-contato')

    const foto = document.createElement('div')
    foto.id = 'foto-perfil'
    foto.style.backgroundImage = `url(${contato.profile})`
    foto.style.backgroundSize = 'cover'
    foto.style.backgroundPosition = 'center'
    card.appendChild(foto)

    const detalhes = document.createElement('div')
    detalhes.classList.add('detalhes-contato')

    const nome = document.createElement('p')
    nome.classList.add('nome')
    nome.textContent = contato.name
    detalhes.appendChild(nome)

    const numero = document.createElement('p')
    numero.classList.add('numero')
    numero.textContent = contato.description
    detalhes.appendChild(numero)

    card.appendChild(detalhes)
    container.appendChild(card)

    card.addEventListener('click', () => preencherConversa(contato.name))
}

async function criarConversa(conversa){
    const conversas = document.querySelector('.conversas')

    const header = document.getElementById('header-conversa')
    header.style.display = 'flex'

    const fotoPerfil = document.getElementById('foto-de-perfil')
    fotoPerfil.style.backgroundImage = `url(${conversa.profile})`
    fotoPerfil.style.backgroundSize = 'cover'
    fotoPerfil.style.backgroundPosition = 'center'

    const nomeUser = document.querySelector('.Username')
    nomeUser.textContent = conversa.name

    const chatAnterior = document.querySelector('.chat')
    if (chatAnterior) chatAnterior.remove()

    const chat = document.createElement('div')
    chat.classList.add('chat')

    conversa.conversas.forEach(msg => {
        const bubble = document.createElement('div')
        const classe = msg.sender === 'me' ? 'mensagem-enviada' : 'mensagem-recebida'
        bubble.classList.add(classe)
        bubble.textContent = msg.content
        chat.appendChild(bubble)
    })

    conversas.appendChild(chat)
}


preencherContatos()
