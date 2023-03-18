const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body: data
    });

    return await res.json();
};

export {postData};

const getData = async (url) => {
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`Сталася помилка ${res.status}, детальніше дивитися в консолі`);
    }
  
    return await res.json();
};

export {getData};