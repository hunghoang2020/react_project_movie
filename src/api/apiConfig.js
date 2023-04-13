const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apikey: '0e1e86d3e71f0243698b4816b4957a3f',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`

}

export default apiConfig;