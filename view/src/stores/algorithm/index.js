import AppDispatcher from '../../dispatcher/appDispatcher';
import EventEmitter from 'events';
import api from '../../services/api'
import FeedbackMessage from '../feedbackMessage/snack'


class Stores extends EventEmitter {

    constructor() {
        super();
        AppDispatcher.register(this.registerActions.bind(this));
    }

    async registerActions(action) {
        switch (action.actionType) {

            case `SUB`:
                this.body = action.body || {}
                this.route = action.body?.algorithm
                this.option = action.body?.option
                await this.setSUB();
                this.emit(this.CHANGE_EVENT);
                break;

            default:
                return true;
        }
        return true;

    }

    async setSUB() {

        const request = `crypt/${this.option}`
        console.log('request', request)
        await api.post(request, this.body)
            .then(res => {
                console.log(res)
                this.message = res.data.message
                this.status = true
                FeedbackMessage.setMessage({
                    variant: 'success',
                    message: 'Algoritmo executado com sucesso'
                })
            })
            .catch((err) => {
                this.status = false
                this.message = ''
                FeedbackMessage.setMessage({
                    variant: 'error',
                    message: 'Erro ao executar Algoritmo'
                })
            })
    }

    getMessage() {
        return this.message || ''
    }

    addChangeListener(callback, CHANGE_EVENT) {
        this.on(CHANGE_EVENT ? CHANGE_EVENT : this.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback, CHANGE_EVENT) {
        this.removeListener(CHANGE_EVENT ? CHANGE_EVENT : this.CHANGE_EVENT, callback);
    }

}

export default new Stores()