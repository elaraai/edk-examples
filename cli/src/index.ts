// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as edk from '@elaraai/edk'

edk.config(".")
    .then(config => {
        if(config) {
            // remove the test scenario
            return edk.removeAsset({
                config,
                dir: '',
                asset: 'test.scenario',
                all: false
            })
        }
        return null
    }).then(config => {
        if(config) {
            // add the test scenrio
            return edk.addScenario({
                config,
                dir: '',
                name: 'Test',
                gen_dir: 'gen',
                def_dir: 'src'
            })
        }
        return null
    }).then(config => {
        if(config) {
            // build the solution
            return edk.buildSchema({
                config,
                dir: '',
                clean: false
            })
        }
        return null
    }).then(config => console.log(config))
