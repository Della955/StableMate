# Generated by Django 4.2.3 on 2023-08-22 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0002_calendar_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calendar',
            name='end_time',
            field=models.CharField(),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='start_time',
            field=models.CharField(),
        ),
    ]