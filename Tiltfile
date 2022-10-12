# allow_k8s_contexts('rancher-desktop')
load('ext://nerdctl', 'nerdctl_build')

nerdctl_build(
  ref='simplelist/source',
  context='.',
  dockerfile = './infra/tilt/Dockerfile.tilt',
  target='source',
  live_update=[
    sync('./', '/nest'),
  ]
)

include('./infra/tilt/Tiltfile')
include('./apps/backend/Tiltfile')
