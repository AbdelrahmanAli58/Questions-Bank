// Utility function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function loadAndGenerate() {
    try {
        const response = await fetch('./questions.json');
        const data = await response.json();

        // Randomize Paragraph
        const randomPara = data.paragraphQuestions[Math.floor(Math.random() * data.paragraphQuestions.length)];
        const paraHTML = `
            <p class="paragraph-text">${randomPara.paragraph}</p>
            <ol>
                ${randomPara.questions.map(q => `<li class="question-item">${q}</li>`).join('')}
            </ol>
        `;
        document.getElementById('paragraph-container').innerHTML = paraHTML;

        // Randomize 4 Open-Ended Questions
        const shuffledOpen = shuffleArray([...data.openEndedQuestions]);
        const selectedOpen = shuffledOpen.slice(0, 4);
        const openHTML = `
            <ul>
                ${selectedOpen.map(q => `<li class="question-item">${q}</li>`).join('')}
            </ul>
        `;
        document.getElementById('open-questions-container').innerHTML = openHTML;

    } catch (error) {
        console.error("Error loading questions. Ensure questions.json is in the same folder.", error);
    }
}

// Event listener for the button
document.getElementById('generate-btn').addEventListener('click', loadAndGenerate);

// Run once on initial load
window.onload = loadAndGenerate;
