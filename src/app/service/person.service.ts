import { Injectable } from '@angular/core';

export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
    mockNames = ["Maryellen Bourgault","Shantae Palafox","Greg Cruse","Josie Bartsch","Shanta Mcandrews","Jarvis Guerrier","Yuette Matthias","Dacia Orosz","Tiffany Shimer","Jamal Mungin","Celeste Edelstein","Norbert Grisham","Sophia Ruel","Nell Stalcup","Matha Olson","Giselle Tschanz","Misha Baltazar","Marcy Nunley","Belva Winnett","Leticia Paiz","Yuri Satterthwaite","Yevette Barish","Taryn Etter","Marlana Sclafani","Maxine Meachum","Alexandria Toles","Lina Ladue","Hilary Samson","Sulema Basnett","Lynna Egan","Brandy Slaven","Tanisha Mirabito","Bret Rickert","Xavier Watkin","Rosario Bradburn","Carri Parsons","Whitley Mclead","Chun Tutson","Justina Voss","Wei Crivello","Astrid Galati","Audry Patillo","Diedra Acklin","Vincenzo Mcree","Yuriko Brammer","Hilaria Darner","Claretta Gillikin","Audria Luhman","Shauna Delpriore","Claribel Bentler"];
    persons: Person[] = [];

    constructor() {
        let id = 1;
        for (let name of this.mockNames) {
            this.persons.push({
                id: id++,
                firstName: name.split(' ')[0],
                lastName: name.split(' ')[1],
                email: name.replace(' ', '.') + '@email.com',
            });
        }
    }

    async listPerson(): Promise<Person[]> {
        return this.persons;
    }

    async updatePerson(person: Person): Promise<void> {
        console.log('Mock update person');
    }

    async deletePerson(id: number): Promise<void> {
        console.log('Mock delete person');
    }
}
