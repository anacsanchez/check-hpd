import React from "react";
import '../public/style.css';
import { initializeWorker } from '../stories/mocks/browser';

if (typeof global.process === 'undefined') {
    const worker = initializeWorker();
    worker.start()
        .catch(err => console.error(err))
}