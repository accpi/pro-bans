import React from 'react';
import axios from 'axios'
require('promise.prototype.finally');

function ChampionMastery (props) {
    return (
        <div>
            <tr>
                <td>
                    <img 
                        src={'http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/' + props.champion_name + '.png'} 
                        width='75px' height='75px'
                    />
                </td>
                <td>{ props.champion_points }</td>
            </tr>
        </div>
    )
}

function getChampions () {
    return new Promise(resolve => {
        axios.get('http://localhost:3000/champions/')
        .then(res => {
            resolve(res.data)
        })
        .catch(error => {
        })
    })
}


function App (props) {
    return (
		<div>
			<div style={{ textAlign: 'center' }}>
                <p>{ props.summoner_name}</p>
				<table>
                    <thead></thead>
                    <tbody>
                        {props.masteries.map((element, index) => (
                            <ChampionMastery
                                key={ index }
                                champion_name = { element.champion.name } champion_points = { element.mastery.championPoints }
                            />
                        ))}
                    </tbody>
                </table>
			</div>
		</div>
	)
}

export default App