export const useNavigation = () => {
  const route = useRoute()
  
  const navLinks = [
    { name: 'Обо мне', path: '/' },
    { name: 'Контакты', path: '/contact' },
    { name: 'Портфолио', path: '/portfolio' }
  ]

  const isActive = (path: string) => {
    return route.path === path
  }

  return { navLinks, isActive }
}