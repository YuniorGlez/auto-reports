SQUAADS Aura-Scope: Automated Value & ROI Orchestrator

Desarrolla una GitHub Action avanzada que transforme cada Pull Request en un conjunto de activos de negocio. El sistema debe automatizar la traducción de cambios técnicos a informes de valor estratégico, gestionando una carpeta de avances en el repositorio que genere explicaciones no técnicas para el cliente, reportes de impacto operativo para el Product Manager y notas de lanzamiento para el usuario final, todo basado en el ROI del desarrollo realizado.

Checklist de Funcionalidades 
Configurar un workflow de GitHub Actions que se active con cada Pull Request, capturando los diffs de código y metadatos de los commits para su procesamiento. 
Implementar un motor de análisis (vía LLM) que genere tres informes distintos: uno no técnico para el Cliente enfocado en valor, uno táctico para el PM sobre ROI y deuda técnica, y uno funcional para Usuarios Finales. 
Desarrollar la lógica de persistencia para que la acción cree y actualice automáticamente una carpeta de 'advances' en el repositorio, manteniendo un histórico de la evolución del proyecto. 
Diseñar un algoritmo que traduzca el esfuerzo técnico (story points o complejidad) y el tipo de cambio (feature vs bugfix) en métricas de retorno de inversión para los stakeholders.