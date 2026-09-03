for file in src/components/tools/*.tsx; do
    sed -i 's/bg-white dark:bg-slate-900 rounded-\[2rem\] border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm/bg-white rounded-\[2rem\] card-elevation p-5 sm:p-8/g' "$file"
    sed -i 's/bg-white dark:bg-slate-900 rounded-\[2rem\] border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm/bg-white rounded-\[2rem\] card-elevation p-5 sm:p-6/g' "$file"
    sed -i 's/bg-white dark:bg-slate-900 rounded-\[2rem\] border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-sm/bg-white rounded-\[2rem\] card-elevation p-5 sm:p-8/g' "$file"
    sed -i 's/bg-white dark:bg-slate-900 rounded-\[2rem\] border border-slate-200 dark:border-slate-800 p-6 shadow-sm/bg-white rounded-\[2rem\] card-elevation p-6 sm:p-8/g' "$file"
    sed -i 's/bg-white dark:bg-slate-900 rounded-\[2rem\] border border-slate-200 dark:border-slate-800 p-5 shadow-sm/bg-white rounded-\[2rem\] card-elevation p-5 sm:p-6/g' "$file"
done
