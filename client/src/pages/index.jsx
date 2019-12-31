import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import MasteryDisplay from '../components/mastery_display'

async function findSummoner(summoner_name) {
    return new Promise(resolve => {
        axios.get(`http://localhost:3000/users/summoner/` + summoner_name)
        .then(res => {
            if(res.data.length) {
                getMasteries(res.data[0].summoner_id)
                .then(function(value) {
                    resolve(value)
                })
            }
            else {
                axios.post(`http://localhost:3000/users`, {
                    'summoner_name': summoner_name
                })
                .then(res_post => {
                    getMasteries(res_post.data.summoner_id)
                    .then(function(value) {
                        resolve(value)
                    })
                })
                .catch(error_post => {
                    console.log(error_post)
                })
            }
        })
    })
}

async function getMasteries(summoner_id) {
    return new Promise(resolve => {
        axios.get(`http://localhost:3000/champion_masteries/` + summoner_id)
        .then(res => {
            if(res.data.length) {
                let json_array = res.data
                resolve(json_array.slice(0, 5))
            }
            else {
                console.log('No champion masteries found')
            }
            return res.data
        })

    })

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

function joinChampionsMasteries(champions, masteries) {
	let joined_matches = []
	
	return new Promise(resolve => {
		resolve(
			masteries.map((mastery) => {
				champions.map((champion) => {
					if(mastery.championId === champion.id) {
						joined_matches.push({
							mastery: mastery,
							champion: champion
						})
					}
				})
			})
		)
	})
	.then(function (value) {
		return joined_matches
	})
}

function foo(summoner_name, champions) {
	findSummoner(summoner_name)
	.then(async value => {
		return joinChampionsMasteries(champions, value)
	})
	.then(function (result) {
			return result
	})
}

function App() {
	const [champions, set_champions] = useState(null)
	const [champions_set, set_champions_set] = useState(false)
    const [top, set_top] = useState('Ryujinism')
	const [top_masteries, set_top_masteries] = useState({ masteries: null })
	const [jungle, set_jungle] = useState('you go chinatown')
    const [jungle_masteries, set_jungle_masteries] = useState({ masteries: null })
    const [mid, set_mid] = useState('Emy')
    const [mid_masteries, set_mid_masteries] = useState({ masteries: null })
    const [marksman, set_marksman] = useState('SKT T1 Luda')
    const [marksman_masteries, set_marksman_masteries] = useState({ masteries: null })
    const [support, set_support] = useState('Recallings')
    const [support_masteries, set_support_masteries] = useState({ masteries: null })

    const [redirect, set_redirect] = useState(false)

	useEffect(() => {
		if (!champions_set) {
			getChampions()
			.then(champs => {
				return set_champions(champs)    
			})
			.then(() => {
				set_champions_set(true)
			})
		}
	});

    const handleSubmit = e => {
        e.preventDefault()
		
        findSummoner(top)
        .then(async value => {
			return joinChampionsMasteries(champions, value)
		})
		.then(function (result) {
			set_top_masteries({masteries: result})
		})

		findSummoner(jungle)
        .then(async value => {
			return joinChampionsMasteries(champions, value)
		})
		.then(function (result) {
			set_jungle_masteries({masteries: result})
		})
		
		findSummoner(mid)
        .then(async value => {
			return joinChampionsMasteries(champions, value)
		})
		.then(function (result) {
			set_mid_masteries({masteries: result})
		})

		findSummoner(marksman)
        .then(async value => {
			return joinChampionsMasteries(champions, value) 
		})
		.then(function (result) {
			set_marksman_masteries({masteries: result})
		})

		findSummoner(support)
        .then(async value => {
			return joinChampionsMasteries(champions, value)
		})
		.then(function (result) {
			set_support_masteries({masteries: result})
		})

		new Promise(resolve => {
			setTimeout(() => {
				resolve(set_redirect(true))
			}, 2000)
		})
		console.log("click")
    }
    
    if (redirect) {    
		return (
			<div style={{ textAlign: 'center' }}>
				<div style={{ display: 'inline-flex', margin: '0 auto' }}>
					<MasteryDisplay masteries={ top_masteries.masteries } summoner_name={ top } />
					<MasteryDisplay masteries={ jungle_masteries.masteries } summoner_name={ jungle } />
					<MasteryDisplay masteries={ mid_masteries.masteries } summoner_name={ mid } />
					<MasteryDisplay masteries={ marksman_masteries.masteries } summoner_name={ marksman } />
					<MasteryDisplay masteries={ support_masteries.masteries } summoner_name={ support } />
				</div>
			</div>
		)
    }
    else {
        return (
			<div style={{ textAlign: 'center' }}>
				<div style={{ display: 'inline-block' }}>
					<form onSubmit={ handleSubmit }> 
						<table>
							<thead>
								<tr>
									<th>Top</th>
									<th>Jungle</th>
									<th>Mid</th>
									<th>Marksman</th>
									<th>Support</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<input 
											type='text' placeholder='Summoner Name' required
											value={ top } onChange={ e => set_top(e.target.value) }
											style={{ textAlign: 'center'}}
										/>
									</td>
									<td>
										<input 
											type='text' placeholder='Summoner Name' 
											value={ jungle } onChange={ e => set_jungle(e.target.value) }
											style={{ textAlign: 'center'}}
										/>
									</td>
									<td>
										<input 
											type='text' placeholder='Summoner Name' 
											value={ mid } onChange={ e => set_mid(e.target.value) }
											style={{ textAlign: 'center'}}
										/>
									</td>
									<td>
										<input 
											type='text' placeholder='Summoner Name' 
											value={ marksman } onChange={ e => set_marksman(e.target.value) }
											style={{ textAlign: 'center'}}
										/>
									</td>
									<td>
										<input 
											type='text' placeholder='Summoner Name' 
											value={ support } onChange={ e => set_support(e.target.value) }
											style={{ textAlign: 'center'}}
										/>
									</td>
								</tr>
							</tbody>
						</table>
						<button type='submit'>Scout!</button>
					</form>
				</div>   
			</div>
        )
    }
    
}

export default App;