load('ext://nerdctl', 'nerdctl_build')

nerdctl_build(
    ref='registry.example.com/my-image',
    context='.',
    dockerfile = './deployment/tilt/Dockerfile.tilt',
    target='source',
    live_update=[
      sync('./', '/nest'),
    ]
)

include('./infra/tilt/Tiltfile')
include('./apps/backend/Tiltfile')
