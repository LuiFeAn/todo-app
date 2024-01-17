import Page from './page';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Todos',
    description:'Gerencie suas tarefas'
};

export default function TodosLayout(){

    return (
        <Page/>
    )

}