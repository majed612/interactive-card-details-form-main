const steps = document.querySelectorAll('.step')
const inputs = [...document.querySelectorAll('.form input')]
const submitBtn = document.querySelector('[data-submit]')
const confirmBtn = document.querySelector('[data-confirm]')

let index = 0

inputs.forEach(inp=> inp.addEventListener('input',displyInfo))

submitBtn.addEventListener('click', ()=> {
    const valdate = inputs.filter(inp=> throwError(inp)).length > 0
    // const valdate = inputs.some(inp=> throwError(inp))
    if(valdate) return
    showCurrent(1)
})

confirmBtn.addEventListener('click',()=> showCurrent(-1))

function showCurrent(n) {
    index += n
    steps[index].removeAttribute('hidden')
    
    steps.forEach((step, i) => {
        setTimeout(() => {
            step.classList.toggle('active', index === i);
        }, 0);

        step.addEventListener('transitionend', () => {
            step.toggleAttribute('hidden', index !== i);
        });
    }) 
}

function displyInfo(e) {
    const id = e.target.getAttribute('id')
    document.querySelector(`[data-card-info=${id}`)
        .innerHTML = getCarddata(e.target, id)
}

function getCarddata(inp, id) {
    const resetInfo = {
        name:  'Jane Appleseed',
        number:  '0000 0000 0000 0000',
        month:  '00',
        year:  '00',
        cvc:  '000',
    }
    
    if(inp.value === '') return resetInfo[id]

    return  inp.value = id === 'number' ? inp.value.match(/\w{1,4}/g).join(' ') : inp.value
}

function throwError(inp) {
    const parent = inp.closest('.form--group');
    const msg = inp.value == '' ? "Can't be blank" :
    !inp.validity.valid ? 'Wrong format, number only' : ''
    const valdate = !inp.validity.valid || inp.value === ''

    parent.toggleAttribute('data-error', valdate)
    inp.parentElement.classList.toggle('error', valdate)
    parent.querySelector('.error-message').innerHTML = msg

    return valdate
}