# Generated by Django 4.2.3 on 2023-08-22 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='task')),
                ('start_time', models.DateField()),
                ('end_time', models.DateField()),
            ],
        ),
    ]
