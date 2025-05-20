// src/integrations/VRIntegration.test.js
import VRIntegration from './VRIntegration'
import * as THREE from 'three'

jest.mock('three/examples/jsm/webxr/VRButton.js', () => ({
  VRButton: { createButton: jest.fn(() => document.createElement('button')) }
}))

describe('VRIntegration', () => {
  let renderer, scene, camera, modalManager, experience

  beforeEach(() => {
    renderer = { xr: { enabled: false, getSession: jest.fn(() => null), setSession: jest.fn() }, setAnimationLoop: jest.fn() }
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera()
    modalManager = {}
    experience = { world: { robot: { group: { position: new THREE.Vector3(1, 2, 3) } } } }
    document.body.innerHTML = ''
  })

  test('habilita xr y agrega VRButton al body', () => {
    new VRIntegration({ renderer, scene, camera, modalManager, experience })
    expect(renderer.xr.enabled).toBe(true)
    expect(document.body.querySelector('button')).toBeTruthy()
  })

  test('agrega controllers a la escena', () => {
    const addSpy = jest.spyOn(scene, 'add')
    new VRIntegration({ renderer, scene, camera, modalManager, experience })
    expect(addSpy).toHaveBeenCalled()
  })

  test('bindCharacter añade personajes', () => {
    const vr = new VRIntegration({ renderer, scene, camera, modalManager, experience })
    const character = {}
    vr.bindCharacter(character)
    expect(vr.characters).toContain(character)
  })

  test('setUpdateCallback asigna función', () => {
    const vr = new VRIntegration({ renderer, scene, camera, modalManager, experience })
    const cb = jest.fn()
    vr.setUpdateCallback(cb)
    expect(vr.updateCallback).toBe(cb)
  })
})
