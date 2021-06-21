import AppDispatcher from '../../dispatcher/appDispatcher';

class AlgorithmActions {

    async sub(body, CHANGE_EVENT) {
        console.log('aqui no action')
        AppDispatcher.dispatch({
            actionType: 'SUB',
            body,
            CHANGE_EVENT
        });
    };

}


export default new AlgorithmActions();
