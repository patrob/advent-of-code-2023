if [ $1 -lt 10 ]
then
    num="0$1"
else
    num="$1"
fi

day="day$num"

echo "Creating Day $1 Files"
mkdir src/$day
touch src/$day/$day.ts src/$day/$day.spec.ts src/$day/input.txt
cat scripts/day-template.txt > src/$day/$day.ts
cat scripts/day-spec-template.txt > src/$day/$day.spec.ts
sed -i -e "s/DayX/Day$num/g" src/$day/$day.ts
sed -i -e "s/DayX/Day$num/g" src/$day/$day.spec.ts
sed -i -e "s/dayX/day$num/g" src/$day/$day.spec.ts
sed -i -e "s/X/$1/g" src/$day/$day.ts
rm -rf src/**/*.ts-e