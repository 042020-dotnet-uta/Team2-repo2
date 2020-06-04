export class User {
    id: number;
    fName: string;
    lName: string;

    // kludge, used as email
    password: string;
    userTypeID: number;

    constructor(id?: number) {
        this.id = id;
    }

}