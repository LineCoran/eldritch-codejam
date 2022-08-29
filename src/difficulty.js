const difficultyButtons = document.querySelectorAll('.difficulty');

export function listenerForDifficultyButtons() {
    for (let i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener('click', item => getDifficulty(item))
    }
}

export function getDifficulty(item) {
    return item.target.id;
}