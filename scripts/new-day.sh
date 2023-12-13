if [ $1 -lt 10 ]
then
    num="0$1"
    prevNum="0$(($1 - 1))"
else
    num="$1"
    prevNum="$(($1 - 1))"
fi

day="day$num"
prevDay="day$prevNum"
prevImport="import Day$prevNum from \"\.\/$prevDay\/$prevDay\"\;"
currentImport="import Day$num from \"\.\/$day\/$day\"\;"
prevInstance="new Day$prevNum(),"
currentInstance="new Day$num(),"

echo "Creating Day $1 Files"
mkdir src/$day
touch src/$day/$day.ts src/$day/$day.spec.ts src/$day/input.txt src/$day/types.ts
cat scripts/day-template.txt > src/$day/$day.ts
cat scripts/day-spec-template.txt > src/$day/$day.spec.ts
sed -i -e "s/DayX/Day$num/g" src/$day/$day.ts
sed -i -e "s/DayX/Day$num/g" src/$day/$day.spec.ts
sed -i -e "s/dayX/day$num/g" src/$day/$day.spec.ts
sed -i -e "s/X/$1/g" src/$day/$day.ts
sed -i -e "s/X/$1/g" src/$day/$day.spec.ts
sed -i -e "s/$prevImport/$prevImport\n$currentImport/g" src/days.ts
sed -i -e "s/$prevInstance/$prevInstance\n$currentInstance/g" src/days.ts
rm -rf src/**/*.ts-e
rm -rf src/*.ts-e
npm run lint