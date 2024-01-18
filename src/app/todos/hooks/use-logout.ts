

export default function useLogout(){

    function handleLogout(){

        localStorage.clear();

        document.cookie = `JWT=""`;

    }

    return {
        handleLogout
    }

}