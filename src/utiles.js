import { isIterable } from 'core-js';

export function AddFavoritos(value){
    
    let favoritos = JSON.parse(localStorage.getItem('favoritos'));
    
    if(isIterable(favoritos)){
        let exists = false;
        for(let i = 0; i < favoritos.length; i++){
            if(favoritos[i].id === value.id){
                exists = true;
                console.log("existe");
                break;
            }
        }

        if(!exists){
            favoritos.push(value);
        }
       
    }else{
        favoritos = [];
        favoritos.push(value);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

export function GetFavoritos(){
    return JSON.parse(localStorage.getItem('favoritos'));
}

