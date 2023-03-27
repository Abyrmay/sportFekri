import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix'
})
export class AsterixPipe implements PipeTransform {

  transform(ch:string)  {
let res='';
let voyles=['a','e','i','u','o','y']
for (let index = 0; index < ch.length; index++) {

  let intermidiate=ch[index]
for (let j = 0; j < voyles.length; j++) {
  if (ch[index]==voyles[j]) {
    intermidiate='*'
    break
  }
  res+= intermidiate;
}  
return res ;
}

  
}

}
