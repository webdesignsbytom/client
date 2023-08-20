import { useContext } from 'react';
// Context
import { GameContext } from '../context/GameContext';
import { ToggleContext } from '../context/ToggleContext';

export function AchievementsListener() {
    const { playerCharacter } = useContext(GameContext);
    const { toggleAchievementReadyFun } = useContext(ToggleContext)

//   playerCharacter.achievements.forEach((achievement) => {
//     if (achievement.type === 'clicks') {
//       if (playerCharacter.totalTimesClicked >= achievement.goal && achievement.viewed === false)
//         achievement.completed = true;
//         toggleAchievementReadyFun()
//     }
//   });
}
