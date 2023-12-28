const botao = document.getElementById('botao');

botao.addEventListener('click', function () {
    let cidadeInput = document.getElementById('cidade');
    let cidade = cidadeInput.value;

    if (!cidade) {
        alert('Por favor, insira o nome da cidade.');
        return;
    }

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&lang=pt_br&appid=731ba802ca12aef514189d3fd25c3280&units=metric")
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados do clima: ' + response.statusText);
            }

            return response.json();
        })
        .then(data => {
            document.querySelector('.infos').style.display = "flex";

            let cidadeSpan = document.getElementById('nome-cidade');
            let paisSpan = document.getElementById('pais');
            let temperaturaSpan = document.getElementById('temperatura');

            if (data.name && data.sys && data.main && data.cod == 200) {
                cidadeSpan.innerHTML = data.name + " - ";
                paisSpan.innerHTML = data.sys.country;
                temperaturaSpan.innerHTML = Math.floor(data.main.temp) + "ºC";
            } else if (data.cod == 404) {
                cidadeSpan.innerHTML = "Cidade não encontrada";
                paisSpan.innerHTML = "";
                temperaturaSpan.innerHTML = "";
            } else {
                throw new Error('Dados de clima inválidos ou incompletos.');
            }
        })
        .catch(error => {
            console.error('Erro na solicitação à API:', error);
            alert('Erro ao obter dados do clima. Por favor, tente novamente.');
        });
});
