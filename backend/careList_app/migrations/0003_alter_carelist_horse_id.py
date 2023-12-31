# Generated by Django 4.2.4 on 2023-08-10 21:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('horse_app', '0003_alter_horse_stable_id'),
        ('careList_app', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carelist',
            name='horse_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='care_list', to='horse_app.horse'),
        ),
    ]
