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

async function preencherContatos() {
    const contatos = await pesquisarContatos()
    contatos.dados_contato.forEach(criarContato)
}

async function pesquisarConversa(name) {
    const url = `https://giovanna-whatsapp.onrender.com/v1/whatsapp/conversas?numero=11987876567&contato=${name}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar conversa:", error)
        return null
    }
}

async function preencherConversa(name) {
    const data = await pesquisarConversa(name)
    const conversa = data.conversas[0]
    criarConversa(conversa)
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
        const caixinhaMsg = document.createElement('div')
        //se a mensagem for minha, vira a classe mensagem enviada, se for do outro vira mensagem recebida.
        const classe = msg.sender === 'me' ? 'mensagem-enviada' : 'mensagem-recebida'
        caixinhaMsg.classList.add(classe)
        caixinhaMsg.textContent = msg.content
        chat.appendChild(caixinhaMsg)
    })

    conversas.appendChild(chat)
}


preencherContatos()

