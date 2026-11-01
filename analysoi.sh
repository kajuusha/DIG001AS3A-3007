#!/bin/bash

REPORT="analysis_report.txt"
echo "Detected languages:" > $REPORT
find . -type f -name "*.py" | grep -q . && echo "- Python" >> $REPORT
find . -type f -name "*.java" | grep -q . && echo "- Java" >> $REPORT
find . -type f -name "*.js" | grep -q . && echo "- JavaScript" >> $REPORT
find . -type f -name "*.ts" | grep -q . && echo "- TypeScript" >> $REPORT
find . -type f -name " *. html" | grep -q . && echo "- HTML" >> $REPORT
find . -type f -name " *. css" | grep -q . && echo "- CSS" >> $REPORT

echo "" $REPORT

echo "Design patterns detected:" >> $REPORT

grep -R "getInstance" -n . && echo "- Singleton" >> $REPORT
grep -R "create[A-Z]" -n . && echo "- Factory Method" >> $REPORT
grep -R "notify" -n . && echo "- Observer" >> $REPORT
grep -R "Strategy" -n . && echo "- Strategy" >> $REPORT
grep -R "Decorator" -n . && echo "- Decorator" >> $REPORT 
