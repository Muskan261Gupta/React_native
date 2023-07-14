import ADD_ENTRY from './constants';

export function addEntry(data) {
    return{
        type: ADD_ENTRY,
        data:data
    }
}
