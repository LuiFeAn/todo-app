

export default function passwordValidation(password: string){

    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

}