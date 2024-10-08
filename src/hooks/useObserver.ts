import { useEffect, RefObject } from 'react'
import ObserverCallback from '../types/ObserverCallback'

const useObserver = (ref: RefObject<Element>, callback: ObserverCallback, threshold: number | number[] = 0.1) => {
  useEffect(() => {
    const {current} = ref
    if (!current) return

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        callback(entry.isIntersecting)
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: threshold,
    })

    observer.observe(current)

    return () => {
      observer.unobserve(current)
    }
  }, [ref, callback, threshold])
}

export default useObserver
