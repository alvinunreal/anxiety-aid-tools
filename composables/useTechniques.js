export const useTechniques = () => {
  const allTechniquesData = {
    'breathing': {
      id: 'breathing',
      icon: 'ph:wind-fill',
      iconColor: 'text-cyan-600',
      tags: ['high-anxiety', 'short-time']
    },
    'grounding': {
      id: 'grounding',
      icon: 'ph:anchor-simple-fill',
      iconColor: 'text-green-600',
      tags: ['high-anxiety', 'short-time']
    },
    'guided-breathing': {
      id: 'guidedBreathing',
      icon: 'ph:timer-fill',
      iconColor: 'text-blue-600',
      tags: ['moderate-anxiety', 'medium-time']
    },
    'progressive-muscle-relaxation': {
      id: 'progressiveMuscleRelaxation',
      icon: 'ph:person-arms-spread-fill',
      iconColor: 'text-purple-600',
      tags: ['moderate-anxiety', 'medium-time']
    },
    'peaceful-visualization': {
      id: 'peacefulVisualization',
      icon: 'material-symbols:landscape',
      iconColor: 'text-green-600',
      tags: ['moderate-anxiety', 'medium-time'],
      isNew: true
    },
    'thought-labeling': {
      id: 'thoughtLabeling',
      icon: 'ph:brain-fill',
      iconColor: 'text-indigo-600',
      tags: ['moderate-anxiety', 'medium-time']
    },
    'stress-relief-bubbles': {
      id: 'stressReliefBubbles',
      icon: 'ph:circles-four-fill',
      iconColor: 'text-teal-600',
      tags: ['high-anxiety', 'short-time']
    },
    'sound-therapy': {
      id: 'soundTherapy',
      icon: 'ph:waveform-fill',
      iconColor: 'text-indigo-600',
      tags: ['moderate-anxiety', 'medium-time', 'long-time']
    },
    'stress-ball': {
      id: 'stressBall',
      icon: 'ph:circle-fill',
      iconColor: 'text-orange-600',
      tags: ['high-anxiety', 'short-time']
    }
  }

  const allTechniques = computed(() => Object.values(allTechniquesData))

  const getTechnique = (id) => allTechniquesData[id]

  const getRelatedTechniques = (currentId, limit = 3) => {
    const current = allTechniquesData[currentId]
    if (!current) return []

    const others = Object.entries(allTechniquesData)
      .filter(([key, t]) => key !== currentId)
      .map(([key, t]) => t)

    // Score techniques by tag overlap
    const scored = others.map(technique => {
      const sharedTags = technique.tags.filter(tag => current.tags.includes(tag))
      return { technique, score: sharedTags.length }
    })

    // Sort by score and return top techniques
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.technique)
  }

  const getTechniqueRoute = (technique) => {
    return `/${technique.id.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
  }

  return {
    allTechniques,
    getTechnique,
    getRelatedTechniques,
    getTechniqueRoute
  }
}