document.addEventListener('DOMContentLoaded', () => {
    const percentageEl = document.getElementById('percentage');
    const detailEl = document.getElementById('detail');
    const progressBarEl = document.getElementById('progress-bar');
    const GOAL = 80;

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar data.json. Asegúrate de que el archivo existe.');
            }
            return response.json();
        })
        .then(data => {
            const { asistidos, totales } = data;

            if (totales === 0) {
                percentageEl.textContent = '0%';
                detailEl.textContent = 'Aún no se jugaron partidos.';
                progressBarEl.style.width = '0%';
                return;
            }

            const percentage = (asistidos / totales) * 100;
            const percentageFormatted = Math.round(percentage);

            percentageEl.textContent = `${percentageFormatted}%`;
            detailEl.textContent = `Asistió a ${asistidos} de ${totales} partidos.`;
            progressBarEl.style.width = `${percentage}%`;

            if (percentageFormatted >= GOAL) {
                progressBarEl.style.backgroundColor = 'var(--green-success)';
                percentageEl.style.color = 'var(--green-success)';
            } else {
                progressBarEl.style.backgroundColor = 'var(--red-fail)';
                percentageEl.style.color = 'var(--red-fail)';
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            detailEl.textContent = 'Error al cargar los datos. Revisa la consola.';
        });
});
