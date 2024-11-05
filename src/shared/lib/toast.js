import toasteventbus from 'primevue/toasteventbus'

export const info = (summary = '', detail = '', life = 3000) => {
  toasteventbus.emit('add', { severity: 'info', summary, detail, life })
}

export const warn = (summary = '', detail = '', life = 3000) => {
  toasteventbus.emit('add', { severity: 'warn', summary, detail, life })
}

export const success = (summary = '', detail = '', life = 3000) => {
  toasteventbus.emit('add', { severity: 'success', summary, detail, life })
}

export const error = (summary = '', detail = '', life = 3000) => {
  toasteventbus.emit('add', { severity: 'error', summary, detail, life })
}